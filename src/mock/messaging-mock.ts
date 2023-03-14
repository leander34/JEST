import { MessagingProtocol } from '../interfaces/messaging-protocol'

export class MessagingMock implements MessagingProtocol {
  sendMessage(message: string): void {
    console.log('A messagem foi enviada através de um mock', message)
  }
}
