import { MessagingProtocol } from '../interfaces/messaging-protocol'

export class Messaging implements MessagingProtocol {
  sendMessage(message: string): void {
    console.log('Messagem enviado: ', message)
  }
}
