import IParseEmailTemplateDTO from '@shared/container/providers/EMailTemplateProvider/dtos/IParseEmailTemplateDTO';

export default interface IEmailTemplateProvider {
  parse(data: IParseEmailTemplateDTO): Promise<string>;
}
