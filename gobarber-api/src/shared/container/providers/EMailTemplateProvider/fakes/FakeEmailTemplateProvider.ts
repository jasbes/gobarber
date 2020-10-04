import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';

export default class FakeEmailTemplateProvider
  implements IEmailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
