import {
  Discount,
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './discount'

const createSut = (className: new () => Discount): Discount => {
  return new className()
}

describe('Product', () => {
  afterEach(() => jest.clearAllMocks())

  it('should have no discount', () => {
    const sut = createSut(NoDiscount)
    expect(sut.claculate(10.99)).toBeCloseTo(10.99)
  })

  it('should apply 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount)
    expect(sut.claculate(150.5)).toBeCloseTo(75.25)
  })

  it('should apply 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount)
    expect(sut.claculate(150)).toBeCloseTo(135)
  })
})
