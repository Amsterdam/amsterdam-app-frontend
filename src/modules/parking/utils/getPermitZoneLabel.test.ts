import {getPermitZoneLabel} from '@/modules/parking/utils/getPermitZoneLabel'

describe('getPermitZoneLabel', () => {
  it('returns only the name if id and name are the same', () => {
    const permit_zone = {
      name: 'Stadsbreed',
      permit_zone_id: 'Stadsbreed',
    }

    expect(getPermitZoneLabel(permit_zone)).toBe('Stadsbreed')
  })

  it('returns id and name if id and name are not the same', () => {
    const permit_zone = {
      name: 'Nieuw-West 9e',
      permit_zone_id: 'NW09E',
    }

    expect(getPermitZoneLabel(permit_zone)).toBe('NW09E Nieuw-West 9e')
  })
})
