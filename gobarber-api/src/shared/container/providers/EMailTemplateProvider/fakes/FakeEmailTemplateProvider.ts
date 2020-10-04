import IParseEmailTemplateDTO from '@shared/container/providers/EMailTemplateProvider/dtos/IParseEmailTemplateDTO';
import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';

export default class FakeEmailTemplateProvider
  implements IEmailTemplateProvider {
  public async parse({ template }: IParseEmailTemplateDTO): Promise<string> {
    return template;
  }
}
