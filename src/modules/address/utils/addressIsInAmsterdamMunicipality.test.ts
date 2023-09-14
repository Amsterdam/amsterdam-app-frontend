import {addressIsInAmsterdamMunicipality} from './addressIsInAmsterdamMunicipality'

import {AddressCity, PdokAddress} from '@/modules/address/types'

describe('addressIsInAmsterdamMunicipality', () => {
  it('should return true when woonplaatsnaam is Amsterdam', () => {
    const pdokAddress = {
      woonplaatsnaam: AddressCity.Amsterdam,
    } as unknown as PdokAddress

    const result = addressIsInAmsterdamMunicipality(pdokAddress)

    expect(result).toBe(true)
  })

  it('should return true when woonplaatsnaam is Weesp', () => {
    const pdokAddress = {
      woonplaatsnaam: AddressCity.Weesp,
    } as unknown as PdokAddress

    const result = addressIsInAmsterdamMunicipality(pdokAddress)

    expect(result).toBe(true)
  })

  it('should return false when woonplaatsnaam is not Amsterdam or Weesp', () => {
    const pdokAddress = {
      woonplaatsnaam: 'Sexbierum',
    } as unknown as PdokAddress

    const result = addressIsInAmsterdamMunicipality(pdokAddress)

    expect(result).toBe(false)
  }) as unknown as PdokAddress

  it('should return false when woonplaatsnaam is undefined', () => {
    const pdokAddress = {} as unknown as PdokAddress

    const result = addressIsInAmsterdamMunicipality(pdokAddress)

    expect(result).toBe(false)
  })
})
