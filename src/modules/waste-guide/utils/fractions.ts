import {
  FractionCode,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'

// TODO: Remove when the order is included in the API response
const fractionOrder = [
  FractionCode.Rest,
  FractionCode.GA,
  FractionCode.Papier,
  FractionCode.GFT,
  FractionCode.Glas,
  FractionCode.Textiel,
  FractionCode.Plastic,
]

// TODO: Remove when the names are included in the API response
const customFractionTitles = {
  [FractionCode.GA]: 'Grof afval',
  [FractionCode.GFT]: 'Groente-, fruit-, etensresten en tuinafval (gfe/t)',
  [FractionCode.Glas]: 'Glas',
  [FractionCode.Papier]: 'Papier en karton',
  [FractionCode.Plastic]: 'Plastic',
  [FractionCode.Rest]: 'Restafval',
  [FractionCode.Textiel]: 'Textiel',
}

// TODO: Remove when plastic is supported again
const fractionIsDisabled = ({
  afvalwijzerFractieCode,
}: WasteGuideResponseFraction) =>
  afvalwijzerFractieCode !== FractionCode.Plastic

export const sortFractions = (
  a: WasteGuideResponseFraction,
  b: WasteGuideResponseFraction,
) => {
  const aIndex = fractionOrder.indexOf(a.afvalwijzerFractieCode)
  const bIndex = fractionOrder.indexOf(b.afvalwijzerFractieCode)
  if (aIndex === -1 || bIndex === -1) {
    return 0
  }
  return aIndex - bIndex
}

const collectionByAppointmentTitle =
  'Gfe/t, textiel, papier/karton, glas en restafval'
const collectionByAppointmentCode = 'THUISAFSPR'

export const applyCustomFractionTitle = (
  fraction: WasteGuideResponseFraction,
): WasteGuideResponseFraction => ({
  ...fraction,
  afvalwijzerFractieNaam: customFractionTitles[fraction.afvalwijzerFractieCode],
})

export const collectionByAppointmentApplies = ({
  afvalwijzerBasisroutetypeCode,
  afvalwijzerFractieCode,
}: WasteGuideResponseFraction) => {
  if (afvalwijzerFractieCode !== FractionCode.Rest) {
    return false
  }

  return afvalwijzerBasisroutetypeCode === collectionByAppointmentCode
}

export const getFractionsForCollectionByAppointment = (
  fractions: WasteGuideResponseFraction[],
) => {
  const combinedFractions: WasteGuideResponseFraction[] = []

  fractions.forEach(fraction => {
    const {afvalwijzerFractieCode} = fraction
    if (afvalwijzerFractieCode === FractionCode.GA) {
      combinedFractions.push(applyCustomFractionTitle(fraction))
      return
    }
    if (afvalwijzerFractieCode === FractionCode.Rest) {
      combinedFractions.unshift({
        ...fraction,
        afvalwijzerFractieNaam: collectionByAppointmentTitle,
      })
    }
  })

  return combinedFractions
}

export const getFractions = (wasteGuide: WasteGuideResponseFraction[]) => {
  if (wasteGuide.find(collectionByAppointmentApplies)) {
    return getFractionsForCollectionByAppointment(wasteGuide)
  }

  return wasteGuide
    .filter(fractionIsDisabled)
    .map(applyCustomFractionTitle)
    .sort(sortFractions)
}
