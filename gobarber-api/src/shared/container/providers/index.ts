import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import EtherealEmailProvider from '@shared/container/providers/EmailProvider/implementations/EtherealEmailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  new EtherealEmailProvider(),
);
