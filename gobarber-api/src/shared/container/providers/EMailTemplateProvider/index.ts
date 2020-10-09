import { container } from 'tsyringe';

import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';
import HandlebarsTemplateProvider from '@shared/container/providers/EMailTemplateProvider/implementations/HandlebarsTemplateProvider';

const providers = {
  handleBars: HandlebarsTemplateProvider,
};

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  providers.handleBars,
);
