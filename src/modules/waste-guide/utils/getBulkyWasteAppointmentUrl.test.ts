import {FractionCode} from '../types'
import {getBulkyWasteAppointmentUrl} from './getBulkyWasteAppointmentUrl'
import {Address} from '@/modules/address/types'

describe('getBulkyWasteAppointmentUrl', () => {
  it('should be undefined if not a bulky waste fraction', () => {
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.GFT, 'https://url.com'),
    ).toBeUndefined()
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.Glas, 'https://url.com'),
    ).toBeUndefined()
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.Papier, 'https://url.com'),
    ).toBeUndefined()
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.Plastic, 'https://url.com'),
    ).toBeUndefined()
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.Rest, 'https://url.com'),
    ).toBeUndefined()
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.Textiel, 'https://url.com'),
    ).toBeUndefined()
  })
  it("should be undefined if url doesn't match the bulky waste url", () => {
    expect(
      getBulkyWasteAppointmentUrl(FractionCode.GA, 'https://url.com', 'bar'),
    ).toBeUndefined()
  })
  it('should be just the bulky waste url if no address', () => {
    expect(
      getBulkyWasteAppointmentUrl(
        FractionCode.GA,
        'https://url.com',
        'https://url.com',
      ),
    ).toBe('https://url.com')
  })
  it('should be the bulky waste url with query params if there is an address without addition', () => {
    expect(
      getBulkyWasteAppointmentUrl(
        FractionCode.GA,
        'https://url.com',
        'https://url.com',
        {
          number: 1,
          postcode: '1234AB',
        } as unknown as Address,
      ),
    ).toBe('https://url.com?GUID=1234AB,1,,')
  })
  it('should be the bulky waste url with query params if there is an address with an addition letter', () => {
    expect(
      getBulkyWasteAppointmentUrl(
        FractionCode.GA,
        'https://url.com',
        'https://url.com',
        {
          additionLetter: 'A',
          number: 1,
          postcode: '1234AB',
        } as unknown as Address,
      ),
    ).toBe('https://url.com?GUID=1234AB,1,A,')
  })
  it('should be the bulky waste url with query params if there is an address with an addition number', () => {
    expect(
      getBulkyWasteAppointmentUrl(
        FractionCode.GA,
        'https://url.com',
        'https://url.com',
        {
          additionNumber: '2',
          number: 1,
          postcode: '1234AB',
        } as unknown as Address,
      ),
    ).toBe('https://url.com?GUID=1234AB,1,,2')
  })
})
