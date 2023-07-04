import {
  collectionByAppointmentApplies,
  getFractions,
  getFractionsForCollectionByAppointment,
  sortFractions,
} from './fractions'
import {
  FractionCode,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'

describe('sortFractions', () => {
  test('should correctly sort fractions based on fractionOrder array', () => {
    const fraction1 = {
      afvalwijzerFractieCode: FractionCode.GFT,
    } as unknown as WasteGuideResponseFraction
    const fraction2 = {
      afvalwijzerFractieCode: FractionCode.Plastic,
    } as unknown as WasteGuideResponseFraction
    const fraction3 = {
      afvalwijzerFractieCode: FractionCode.Glas,
    } as unknown as WasteGuideResponseFraction

    const sortedFractions = [fraction1, fraction2, fraction3].sort(
      sortFractions,
    )

    expect(sortedFractions).toStrictEqual([fraction1, fraction3, fraction2])
  })
  test('should not change the order if it is already correct', () => {
    const fraction1 = {
      afvalwijzerFractieCode: FractionCode.Rest,
    } as unknown as WasteGuideResponseFraction
    const fraction2 = {
      afvalwijzerFractieCode: FractionCode.GA,
    } as unknown as WasteGuideResponseFraction
    const fraction3 = {
      afvalwijzerFractieCode: FractionCode.Papier,
    } as unknown as WasteGuideResponseFraction

    const sortedFractions = [fraction1, fraction2, fraction3].sort(
      sortFractions,
    )

    expect(sortedFractions).toStrictEqual([fraction1, fraction2, fraction3])
  })
})

describe('collectionByAppointmentApplies', () => {
  test('should return true if the fraction is Rest and the afvalwijzerBasisroutetypeCode is the collection by appointment code', () => {
    expect(
      collectionByAppointmentApplies({
        afvalwijzerFractieCode: FractionCode.Rest,
        afvalwijzerBasisroutetypeCode: 'THUISAFSPR',
      } as unknown as WasteGuideResponseFraction),
    ).toBe(true)
  })

  test('should return false if the fraction is not Rest', () => {
    expect(
      collectionByAppointmentApplies({
        afvalwijzerFractieCode: FractionCode.Plastic,
        afvalwijzerBasisroutetypeCode: 'THUISAFSPR',
      } as unknown as WasteGuideResponseFraction),
    ).toBe(false)
  })

  test('should return false if the afvalwijzerBasisroutetypeCode is not the collection by appointment code', () => {
    expect(
      collectionByAppointmentApplies({
        afvalwijzerFractieCode: FractionCode.Rest,
        afvalwijzerBasisroutetypeCode: 'OTHERCODE',
      } as unknown as WasteGuideResponseFraction),
    ).toBe(false)
  })
})

describe('getFractionsForCollectionByAppointment', () => {
  test('if there is no "grof afval" fraction: it should return a single fraction, which is the rest fraction with a different title', () => {
    expect(
      getFractionsForCollectionByAppointment([
        {
          afvalwijzerFractieCode: FractionCode.GFT,
        },
        {
          afvalwijzerFractieCode: FractionCode.Rest,
        },
        {
          afvalwijzerFractieCode: FractionCode.Papier,
        },
      ] as WasteGuideResponseFraction[]),
    ).toEqual([
      {
        afvalwijzerFractieCode: FractionCode.Rest,
        afvalwijzerFractieNaam:
          'Gfe/t, textiel, papier/karton, glas en restafval',
      },
    ])
  })

  test('if there is a "grof afval" fraction: it should return the "rest" fraction plus the "grof afval" fraction, in that order, with the correct titles', () => {
    expect(
      getFractionsForCollectionByAppointment([
        {
          afvalwijzerFractieCode: FractionCode.GA,
        },
        {
          afvalwijzerFractieCode: FractionCode.GFT,
        },
        {
          afvalwijzerFractieCode: FractionCode.Rest,
        },
        {
          afvalwijzerFractieCode: FractionCode.Papier,
        },
      ] as WasteGuideResponseFraction[]),
    ).toEqual([
      {
        afvalwijzerFractieCode: FractionCode.Rest,
        afvalwijzerFractieNaam:
          'Gfe/t, textiel, papier/karton, glas en restafval',
      },
      {
        afvalwijzerFractieCode: FractionCode.GA,
        afvalwijzerFractieNaam: 'Grof afval',
      },
    ])
  })
})

describe('getFractions', () => {
  test('should return the combined fractions for collection by appointment if applicable', () => {
    const wasteGuide = [
      {
        afvalwijzerFractieCode: FractionCode.GA,
      },
      {
        afvalwijzerFractieCode: FractionCode.GFT,
      },
      {
        afvalwijzerBasisroutetypeCode: 'THUISAFSPR',
        afvalwijzerFractieCode: FractionCode.Rest,
      },
      {
        afvalwijzerFractieCode: FractionCode.Papier,
      },
    ] as WasteGuideResponseFraction[]

    const expectedCombinedFractions = [
      {
        afvalwijzerBasisroutetypeCode: 'THUISAFSPR',

        afvalwijzerFractieCode: FractionCode.Rest,
        afvalwijzerFractieNaam:
          'Gfe/t, textiel, papier/karton, glas en restafval',
      },
      {
        afvalwijzerFractieCode: FractionCode.GA,
        afvalwijzerFractieNaam: 'Grof afval',
      },
    ]

    expect(getFractions(wasteGuide)).toEqual(expectedCombinedFractions)
  })

  test('should return the filtered, mapped, and sorted fractions if collection by appointment does not apply', () => {
    const wasteGuide = [
      {
        afvalwijzerFractieCode: FractionCode.GFT,
      },
      {
        afvalwijzerFractieCode: FractionCode.Rest,
      },
      {
        afvalwijzerFractieCode: FractionCode.Papier,
      },
    ] as WasteGuideResponseFraction[]

    const expectedSortedFractions = [
      {
        afvalwijzerFractieCode: FractionCode.Rest,
        afvalwijzerFractieNaam: 'Restafval',
      },
      {
        afvalwijzerFractieCode: FractionCode.Papier,
        afvalwijzerFractieNaam: 'Papier en karton',
      },
      {
        afvalwijzerFractieCode: FractionCode.GFT,
        afvalwijzerFractieNaam:
          'Groente-, fruit-, etensresten en tuinafval (gfe/t)',
      },
    ]

    expect(getFractions(wasteGuide)).toEqual(expectedSortedFractions)
  })
})
