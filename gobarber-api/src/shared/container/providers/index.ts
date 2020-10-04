import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import EtherealEmailProvider from '@shared/container/providers/EmailProvider/implementations/EtherealEmailProvider';

import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';
import HandlebarsTemplateProvider from '@shared/container/providers/EMailTemplateProvider/implementations/HandlebarsTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  HandlebarsTemplateProvider,
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  container.resolve(EtherealEmailProvider),
);
