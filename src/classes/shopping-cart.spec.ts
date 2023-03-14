import { CartItem } from '../interfaces/cart-item'
import { Discount } from './discount'
import { ShoppingCart } from './shopping-cart'

const createSut = () => {
  const discountMock = createDiscountMock()
  const sut = new ShoppingCart(discountMock)
  return {
    sut,
    discountMock,
  }
}

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut()
  const cartItem1 = createCartItemMock('Camiste', 100)
  const cartItem2 = createCartItemMock('Caneta', 1)
  sut.addItem(cartItem1)
  sut.addItem(cartItem2)
  return { sut, discountMock }
}

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock()
}

const createCartItemMock = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price)
}

describe('ShoopingCart', () => {
  it('should be an empty when no product is added', () => {
    const { sut } = createSut()
    expect(sut.isEmpyt()).toBeTruthy()
  })

  it('should have 2 cart items', () => {
    const { sut } = createSutWithProducts()
    expect(sut.items.length).toBe(2)
  })

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts()
    expect(sut.total()).toBeCloseTo(101)
    expect(sut.totalWithDiscount()).toBeCloseTo(101)
  })

  it('should add product and clear cart', () => {
    const { sut } = createSutWithProducts()
    const consoleMock = jest.spyOn(console, 'log')
    expect(sut.items.length).toBe(2)
    sut.clear()
    expect(consoleMock).toHaveBeenCalledWith('Carrinho de compras foi limpo')
    expect(sut.items.length).toBe(0)
    expect(sut.isEmpyt).toBeTruthy()
  })

  it('should remove products', () => {
    const { sut } = createSutWithProducts()
    expect(sut.items.length).toBe(2)
    sut.removeItem(0)
    expect(sut.items.length).toBe(1)
    sut.removeItem(0)
    expect(sut.items.length).toBe(0)
    expect(sut.isEmpyt).toBeTruthy()
  })

  it('should call discount.calculate unce when totalWithDiscount id called', () => {
    const { sut, discountMock } = createSutWithProducts()
    const discountMockSpy = jest.spyOn(discountMock, 'claculate')
    sut.totalWithDiscount()
    expect(discountMockSpy).toHaveBeenCalledTimes(1)
  })

  it('should call discount.calculate with total price when totalWithDiscount id called', () => {
    const { sut, discountMock } = createSutWithProducts()
    const discountMockSpy = jest.spyOn(discountMock, 'claculate')
    sut.totalWithDiscount()
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total())
  })
})
