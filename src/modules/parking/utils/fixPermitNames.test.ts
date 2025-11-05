import {ParkingPermit} from '@/modules/parking/types'
import {fixPermitNames} from '@/modules/parking/utils/fixPermitNames'

describe('fixPermitNames', () => {
  it('voegt report_code toe aan permit_name als er meerdere permits met dezelfde naam zijn', () => {
    const permits: ParkingPermit[] = [
      {
        permit_type: 'A',
        permit_name: 'Parkeerbewijs',
        report_code: '123',
        id: 1,
      } as unknown as ParkingPermit,
      {
        permit_type: 'B',
        permit_name: 'Parkeerbewijs',
        report_code: '456',
        id: 2,
      } as unknown as ParkingPermit,
      {
        permit_type: 'B',
        permit_name: 'Ander bewijs',
        report_code: '789',
        id: 3,
      } as unknown as ParkingPermit,
    ]
    const result = fixPermitNames(permits)

    expect(result[0]?.permit_name).toBe('Parkeerbewijs (123)')
    expect(result[1]?.permit_name).toBe('Parkeerbewijs (456)')
    expect(result[2]?.permit_name).toBe('Ander bewijs')
  })

  it('laat permit_name ongemoeid als de naam uniek is', () => {
    const permits: ParkingPermit[] = [
      {
        permit_type: 'A',
        permit_name: 'Parkeerbewijs',
        report_code: '123',
        id: 1,
      } as unknown as ParkingPermit,
      {
        permit_type: 'B',
        permit_name: 'Ander parkeerbewijs',
        report_code: '789',
        id: 2,
      } as unknown as ParkingPermit,
    ]
    const result = fixPermitNames(permits)

    expect(result[0]?.permit_name).toBe('Parkeerbewijs')
    expect(result[1]?.permit_name).toBe('Ander parkeerbewijs')
  })
})
