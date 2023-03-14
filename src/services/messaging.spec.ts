import { Messaging } from './messaging'

const createSut = () => {
  return new Messaging()
}

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks())
  it('should return undefined', () => {
    // System under test
    const sut = createSut()
    expect(sut.sendMessage('teste')).toBeUndefined()
  })

  it('should call console.log unce', () => {
    const sut = createSut()
    const consoleSpy = jest.spyOn(console, 'log')
    sut.sendMessage('teste')
    expect(consoleSpy).toHaveBeenCalledTimes(1)
  })

  it('should call console.log with "Messagem enviada:" and message', () => {
    const sut = createSut()
    const consoleSpy = jest.spyOn(console, 'log')
    sut.sendMessage('teste')
    expect(consoleSpy).toHaveBeenCalledWith('Messagem enviada: ', 'teste')
  })
})
