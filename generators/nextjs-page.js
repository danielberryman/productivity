module.exports = plop => {
  plop.setGenerator('nextjs-page', {
    description: 'Create reusable nextjs page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your page?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../output/{{dashCase name}}/index.tsx',
        templateFile:
          '../plop-templates/component-files/nextjs-page.hbs',
      },
      {
        type: 'add',
        path: '../output/{{dashCase name}}/index.module.css',
      },
      {
        type: 'append',
        path: '../output/{{dashCase name}}/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase name}},`,
      },
    ],
  });
}