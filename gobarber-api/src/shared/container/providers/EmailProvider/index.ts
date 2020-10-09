import { container } from 'tsyringe';

import emailConfig from '@config/email';

import EtherealEmailProvider from '@shared/container/providers/EmailProvider/implementations/EtherealEmailProvider';
import SESEmailProvider from '@shared/container/providers/EmailProvider/implementations/SESEmailProvider';

import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';

const providers = {
  ethereal: container.resolve(EtherealEmailProvider),
  ses: container.resolve(SESEmailProvider),
};

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  providers[emailConfig.driver],
);
