interface IEmailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: { name: string; email: string };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: { name: 'Jefferson', email: 'jefferson_uk@hotmail.com' },
  },
} as IEmailConfig;
