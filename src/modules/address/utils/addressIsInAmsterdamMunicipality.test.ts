import {AddressCity, Address} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'

describe('addressIsInAmsterdamMunicipality', () => {
  it('should return true when woonplaatsnaam is Amsterdam', () => {
    const address = {
      city: AddressCity.Amsterdam,
    } as unknown as Address

    const result = addressIsInAmsterdamMunicipality(address)

    expect(result).toBe(true)
  })

  it('should return true when woonplaatsnaam is Weesp', () => {
    const address = {
      city: AddressCity.Weesp,
    } as unknown as Address

    const result = addressIsInAmsterdamMunicipality(address)

    expect(result).toBe(true)
  })

  it('should return false when woonplaatsnaam is not Amsterdam or Weesp', () => {
    const address = {
      city: 'Sexbierum',
    } as unknown as Address

    const result = addressIsInAmsterdamMunicipality(address)

    expect(result).toBe(false)
  }) as unknown as Address

  it('should return false when woonplaatsnaam is undefined', () => {
    const address = {} as unknown as Address

    const result = addressIsInAmsterdamMunicipality(address)

    expect(result).toBe(false)
  })
})
