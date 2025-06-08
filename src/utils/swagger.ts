import fs from 'fs';
import path from 'path';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { appConfig } from './config';
import { logger } from './logger';

interface SwaggerSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers: Array<{
    url: string;
    description: string;
  }>;
  paths: Record<string, unknown>;
  components: {
    schemas: Record<string, unknown>;
  };
}

/**
 * Loads and merges all YAML documentation files from the swagger-api-docs directory
 * @returns Combined OpenAPI specification object
 */
export const loadSwaggerSpecs = (): SwaggerSpec => {
  const swaggerDir = path.join(process.cwd(), 'src', 'swagger-api-docs');
  const combinedSpec: SwaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Production Node.js Backend API',
      version: '1.0.0',
      description:
        'Comprehensive API documentation for the production-ready Node.js backend with auto-generated component endpoints.',
    },
    servers: [
      {
        url: `http://localhost:${appConfig.port}`,
        description: 'Development server',
      },
      {
        url: `/`,
        description: 'Current server',
      },
    ],
    paths: {},
    components: {
      schemas: {},
    },
  };

  try {
    // Check if swagger directory exists
    if (!fs.existsSync(swaggerDir)) {
      logger.warn('⚠️  Swagger documentation directory not found. Creating empty spec.');
      return combinedSpec;
    }

    // Read all YAML files in the swagger-api-docs directory
    const files = fs
      .readdirSync(swaggerDir)
      .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));

    if (files.length === 0) {
      logger.warn('⚠️  No YAML documentation files found in swagger-api-docs directory.');
      return combinedSpec;
    }

    logger.info(`📚 Loading ${files.length} API documentation file(s)...`);

    files.forEach(file => {
      try {
        const filePath = path.join(swaggerDir, file);
        const fileContent = YAML.load(filePath);
        if (!fileContent) {
          logger.warn(`⚠️  Failed to parse YAML file: ${file}`);
          return;
        }

        // Merge paths from each file
        if (fileContent.paths) {
          Object.assign(combinedSpec.paths, fileContent.paths);
        }

        // Merge schemas from each file
        if (fileContent.components?.schemas) {
          Object.assign(combinedSpec.components.schemas, fileContent.components.schemas);
        }

        logger.info(`✅ Loaded API documentation from: ${file}`);
      } catch (error) {
        logger.error(`❌ Error loading swagger file ${file}:`, error);
      }
    });
    return combinedSpec;
  } catch (error) {
    logger.error('❌ Error loading swagger specifications:', error);
    return combinedSpec;
  }
};

/**
 * Swagger UI configuration options
 */
export const swaggerOptions: swaggerUi.SwaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true,
    requestSnippetsEnabled: true,
    requestSnippets: {
      generators: {
        curl_bash: {
          title: 'cURL (bash)',
          syntax: 'bash',
        },
        curl_powershell: {
          title: 'cURL (PowerShell)',
          syntax: 'powershell',
        },
        curl_cmd: {
          title: 'cURL (CMD)',
          syntax: 'bash',
        },
      },
      defaultExpanded: true,
      languages: ['curl_bash', 'curl_powershell', 'curl_cmd'],
    },
  },
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info .title { color: #3b82f6; }
    .swagger-ui .scheme-container { background: #f8fafc; border-radius: 4px; padding: 10px; }
  `,
  customSiteTitle: 'Production Node.js API Documentation',
  customfavIcon: '/favicon.ico',
};

/**
 * Creates Express middleware for serving Swagger UI
 * @returns Express router for Swagger UI
 */
export const createSwaggerMiddleware = () => {
  const swaggerSpec = loadSwaggerSpecs();

  return swaggerUi.setup(swaggerSpec, swaggerOptions);
};

export { swaggerUi };
