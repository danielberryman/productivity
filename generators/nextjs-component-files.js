module.exports = plop => {
  plop.setGenerator('nextjs-component-files', {
    description: 'Create reusable nextjs react component files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../output/{{titleCase name}}/{{dashCase name}}.tsx',
        templateFile:
          '../plop-templates/component-files/react-component.hbs',
      },
      {
        type: 'add',
        path: '../output/{{titleCase name}}/{{dashCase name}}.module.css',
      },
      {
        type: 'append',
        path: '../output/{{titleCase name}}/{{dashCase name}}.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });
}