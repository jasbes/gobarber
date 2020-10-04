import IParseEmailTemplateDTO from '@shared/container/providers/EMailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IEmailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  to: IEmailContact;
  from?: IEmailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
