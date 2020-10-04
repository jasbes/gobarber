import handlebars from 'handlebars';
import fs from 'fs';

import IParseEmailTemplateDTO from '@shared/container/providers/EMailTemplateProvider/dtos/IParseEmailTemplateDTO';
import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';

export default class HandlebarsTemplateProvider
  implements IEmailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
