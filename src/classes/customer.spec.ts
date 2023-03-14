import { EnterpriseCustomer, IndividualCustomer } from './customer'

const createIndividualCostumer = (
  firstName: string,
  lastName: string,
  cpf: string
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf)
}

const createEnterpriseCostumer = (
  name: string,
  cnpj: string
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj)
}
afterEach(() => jest.clearAllMocks())

describe('IndividualCostumer', () => {
  it('should have firsName, lastName and cpf', () => {
    const sut = createIndividualCostumer('Leander', 'Santos', '000.111.222-21')
    expect(sut).toHaveProperty('firstName', 'Leander')
    expect(sut).toHaveProperty('lastName', 'Santos')
    expect(sut).toHaveProperty('cpf', '000.111.222-21')
  })

  it('should have methods to get name and idn for individual costumers', () => {
    const sut = createIndividualCostumer('Leander', 'Santos', '000.111.222-21')
    expect(sut.getName()).toBe('Leander Santos')
    expect(sut.getIDN()).toBe('000.111.222-21')
  })
})

describe('EnterpriseCostumer', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCostumer('Youtube', '000.111.222/100.0')
    expect(sut).toHaveProperty('name', 'Youtube')
    expect(sut).toHaveProperty('cnpj', '000.111.222/100.0')
  })

  it('should have methods to get name and idn for enterprise customers', () => {
    const sut = createEnterpriseCostumer('Youtube', '000.111.222/100.0')

    expect(sut.getName()).toBe('Youtube')
    expect(sut.getIDN()).toBe('000.111.222/100.0')
  })
})
