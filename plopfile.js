// Helper functions for type mapping
function getZodType(type) {
  const typeMap = {
    string: 'z.string()',
    number: 'z.number()',
    boolean: 'z.boolean()',
    date: 'z.date()',
    array: 'z.array(z.string())', // Default to string array, can be customized
    object: 'z.object({})',
  };
  return typeMap[type] || 'z.string()';
}

function getMongooseType(type) {
  const typeMap = {
    string: 'String',
    number: 'Number',
    boolean: 'Boolean',
    date: 'Date',
    array: '[String]', // Default to string array
    object: 'Schema.Types.Mixed',
  };
  return typeMap[type] || 'String';
}

function getTypeScriptType(type) {
  const typeMap = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    date: 'Date',
    array: 'string[]', // Default to string array
    object: 'Record<string, any>',
  };
  return typeMap[type] || 'string';
}

export default function (plop) {
  // Register Handlebars helpers
  plop.setHelper('eq', (a, b) => a === b);

  plop.setGenerator('router', {
    description: 'Generate a new API router with controller, service, model, and tests',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter router name (e.g. user):',
        validate: value => {
          if (!value) return 'Router name is required';
          if (!/^[a-z][a-z0-9]*$/i.test(value)) {
            return 'Router name must be alphanumeric and start with a letter';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'hasSchema',
        message: 'Do you want to define a schema?',
        default: true,
      },
      {
        type: 'input',
        name: 'schemaFields',
        message:
          'Enter schema fields (format: name:type,email:string,age:number,isActive:boolean):',
        when: answers => answers.hasSchema,
        validate: value => {
          if (!value) return 'Schema fields are required when defining a schema';

          const fields = value.split(',').map(f => f.trim());
          for (const field of fields) {
            if (!field.includes(':')) {
              return 'Each field must be in format "name:type" (e.g., "email:string")';
            }
            const [name, type] = field.split(':');
            if (!name || !type) {
              return 'Field name and type are required (e.g., "email:string")';
            }
            const validTypes = ['string', 'number', 'boolean', 'date', 'array', 'object'];
            if (!validTypes.includes(type.toLowerCase())) {
              return `Invalid type "${type}". Valid types: ${validTypes.join(', ')}`;
            }
          }
          return true;
        },
      },
    ],
    actions: data => {
      const actions = [];

      if (!data) return actions;

      const { name, hasSchema, schemaFields } = data;

      // Process schema fields if provided
      let processedSchemaFields = [];
      if (hasSchema && schemaFields) {
        processedSchemaFields = schemaFields.split(',').map(field => {
          const [fieldName, fieldType] = field.trim().split(':');
          return {
            name: fieldName.trim(),
            type: fieldType.trim().toLowerCase(),
            zodType: getZodType(fieldType.trim().toLowerCase()),
            mongooseType: getMongooseType(fieldType.trim().toLowerCase()),
            tsType: getTypeScriptType(fieldType.trim().toLowerCase()),
          };
        });
      }

      // Add processed schema fields to data for template access
      data.schemaFields = processedSchemaFields;

      // Create directories
      actions.push({
        type: 'add',
        path: 'src/components/{{kebabCase name}}/routes/index.ts',
        templateFile: 'plop-templates/router.hbs',
      });

      actions.push({
        type: 'add',
        path: 'src/components/{{kebabCase name}}/controller/index.ts',
        templateFile: 'plop-templates/controller.hbs',
      });

      actions.push({
        type: 'add',
        path: 'src/components/{{kebabCase name}}/service/index.ts',
        templateFile: 'plop-templates/service.hbs',
      });

      actions.push({
        type: 'add',
        path: 'src/components/{{kebabCase name}}/validation/index.ts',
        templateFile: 'plop-templates/validation.hbs',
      });

      actions.push({
        type: 'add',
        path: 'src/components/{{kebabCase name}}/tests/service.test.ts',
        templateFile: 'plop-templates/test.hbs',
      });

      actions.push({
        type: 'add',
        path: 'src/swagger-api-docs/{{kebabCase name}}.yaml',
        templateFile: 'plop-templates/swagger.hbs',
      });

      if (hasSchema) {
        actions.push({
          type: 'add',
          path: 'src/components/{{kebabCase name}}/model/index.ts',
          templateFile: 'plop-templates/model.hbs',
        });

        actions.push({
          type: 'add',
          path: 'src/components/{{kebabCase name}}/interface/index.ts',
          templateFile: 'plop-templates/interface.hbs',
        });
      } else {
        // Create stub files
        actions.push({
          type: 'add',
          path: 'src/components/{{kebabCase name}}/model/index.ts',
          templateFile: 'plop-templates/model-stub.hbs',
        });

        actions.push({
          type: 'add',
          path: 'src/components/{{kebabCase name}}/interface/index.ts',
          templateFile: 'plop-templates/interface-stub.hbs',
        });
      }

      // Update api.ts to include the new router
      actions.push({
        type: 'modify',
        path: 'src/api.ts',
        pattern: /(\/\/ Import route modules here as they are created)/g,
        template:
          "$1\nimport { {{camelCase name}}Router } from './components/{{kebabCase name}}/routes/index.js';",
      });

      actions.push({
        type: 'modify',
        path: 'src/api.ts',
        pattern: /(\/\/ API routes will be added here by Plop generators)/g,
        template: "$1\napiRouter.use('/{{kebabCase name}}', {{camelCase name}}Router);",
      });

      return actions;
    },
  });
}
