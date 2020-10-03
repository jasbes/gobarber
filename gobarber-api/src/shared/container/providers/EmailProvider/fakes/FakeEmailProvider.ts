import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeEmailProvider implements IEmailProvider {
  private messages: IMessage[] = [];

  public async sendEmail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
