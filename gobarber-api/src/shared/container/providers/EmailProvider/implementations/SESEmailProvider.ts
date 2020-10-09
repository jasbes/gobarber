import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import ISendEmailDTO from '@shared/container/providers/EmailProvider/dtos/ISendEmailDTO';
import IEmailTemplateProvider from '@shared/container/providers/EMailTemplateProvider/models/IEmailTemplateProvider';
import { inject, injectable } from 'tsyringe';

import emailConfig from '@config/email';

@injectable()
export default class SESEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('EmailTemplateProvider')
    private templateProvider: IEmailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const { name, email } = emailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.templateProvider.parse(templateData),
    });
  }
}
