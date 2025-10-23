import {extractAddressFromParkingMachineName} from '@/modules/parking/utils/extractAddressFromParkingMachineName'

describe('extractAddressFromParkingMachineName', () => {
  it('should return address and number without addition if provided.', () => {
    const parkingName = "'BROUWERSGRACHT 63 T/O'"

    expect(extractAddressFromParkingMachineName(parkingName)).toBe(
      'BROUWERSGRACHT 63',
    )
  })

  it('should return address and number if no addition is provided.', () => {
    const parkingName = "'BROUWERSGRACHT 63'"

    expect(extractAddressFromParkingMachineName(parkingName)).toBe(
      'BROUWERSGRACHT 63',
    )
  })

  it('should return address and number if no addition is provided and no apostrophes are included.', () => {
    const parkingName = 'BROUWERSGRACHT 63'

    expect(extractAddressFromParkingMachineName(parkingName)).toBe(
      'BROUWERSGRACHT 63',
    )
  })

  it('should return address and number if without long addition', () => {
    const parkingName = "'BROUWERSGRACHT 63 T/O_BORD_TEST'"

    expect(extractAddressFromParkingMachineName(parkingName)).toBe(
      'BROUWERSGRACHT 63',
    )
  })

  it('should return address and number without whitespaces if provided', () => {
    const parkingName = "'   BROUWERSGRACHT 63 '"

    expect(extractAddressFromParkingMachineName(parkingName)).toBe(
      'BROUWERSGRACHT 63',
    )
  })
})
