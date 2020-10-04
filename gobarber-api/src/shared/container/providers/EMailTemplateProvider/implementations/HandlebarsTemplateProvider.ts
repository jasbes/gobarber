import handlebars from 'handlebars';

import IParseEmailTemplateDTO from '@shared/container/providers/EMailTemplateProvider/dtos/IParseEmailTemplateDTO';
import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';

export default class HandlebarsTemplateProvider
  implements IEmailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
