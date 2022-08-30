module.exports = plop => {
  plop.setGenerator('nextjs-crud-api', {
    description: 'Create a reusable nextjs crud api',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your input name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../output/{{dashCase name}}.ts',
        templateFile:
          '../plop-templates/crud-api-templates/nextjs-api.hbs',
      },
      {
        type: 'append',
        path: '../output/{{dashCase name}}.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });
}