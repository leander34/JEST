import { CartItem } from '../interfaces/cart-item'
import { CustomerOrder } from '../interfaces/customer-protocol'
import { MessagingProtocol } from '../interfaces/messaging-protocol'
import { PersistencyProtocol } from '../interfaces/persistency-protocol'
import { ShoppingCartProtocol } from '../interfaces/shopping-cart-protocol'
import { Order } from './order'

const createSut = () => {
  const shoppingCartMock = new ShoopingCartMock()
  const messagingMock = new MessagingMock()
  const persistencyMock = new PersistencyMock()
  const customerMock = new CustomerMock()

  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock
  )

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
  }
}

class ShoopingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem>[] {
    return []
  }
  addItem(item: CartItem): void {
    throw new Error('Method not implemented.')
  }
  removeItem(index: number): void {}
  total(): number {
    return 1
  }
  totalWithDiscount(): number {
    return 2
  }
  isEmpyt(): boolean {
    return false
  }
  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessage(message: string): void {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return ''
  }

  getIDN(): string {
    return ''
  }
}

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut()
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpyt')
      .mockReturnValueOnce(true)
    sut.checkout()
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1)
    expect(sut.orderStatus).toBe('open')
  })

  it('shoud checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut()
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpyt')
      .mockReturnValueOnce(false)
    sut.checkout()
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1)
    expect(sut.orderStatus).toBe('closed')
  })

  it('shoud send an email to customer', () => {
    const { sut, messagingMock } = createSut()
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage')
    sut.checkout()
    expect(messagingMockSpy).toHaveBeenCalledTimes(1)
  })

  it('shoud save order', () => {
    const { sut, persistencyMock } = createSut()
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder')
    sut.checkout()
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1)
  })

  it('shoud save order', () => {
    const { sut, shoppingCartMock } = createSut()
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear')
    sut.checkout()
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1)
  })
})
