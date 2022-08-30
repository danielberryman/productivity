module.exports = plop => {
  plop.setGenerator('nextjs-auth-guard', {
    description: 'Create a reusable nextjs auth guard',
    actions: [
      {
        type: 'add',
        path: 'auth-guard.ts',
        templateFile:
          'plop-templates/utils/nextjs-auth-guard.hbs',
      }
    ],
  });
}