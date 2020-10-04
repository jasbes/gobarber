import nodemailer, { Transporter } from 'nodemailer';
import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';

export default class EtherealEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Preview url %s', nodemailer.getTestMessageUrl(message));
  }
}
