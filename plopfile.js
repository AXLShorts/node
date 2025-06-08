export default function (plop) {
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
    ],
    actions: data => {
      const actions = [];

      if (!data) return actions;

      const { name, hasSchema } = data;

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
