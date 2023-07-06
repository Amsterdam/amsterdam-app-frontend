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
const fractionIsSupported = ({
  afvalwijzerFractieCode,
}: WasteGuideResponseFraction) =>
  afvalwijzerFractieCode !== FractionCode.Plastic

/**
 * Sort fractions in the order set in `fractionOrder`.
 */
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

/**
 * The title of the combined fraction in the case of "collection by appointment".
 */
const collectionByAppointmentTitle =
  'Gfe/t, textiel, papier/karton, glas en restafval'

/**
 * The value that `afvalwijzerBasisroutetypeCode` should have if "collection by appointment" is applicable.
 */
const collectionByAppointmentCode = 'THUISAFSPR'

/**
 * Adds the title as defined in `customFractionTitles` to the fraction.
 */
export const applyCustomFractionTitle = (
  fraction: WasteGuideResponseFraction,
): WasteGuideResponseFraction => ({
  ...fraction,
  afvalwijzerFractieNaam: customFractionTitles[fraction.afvalwijzerFractieCode],
})

/**
 * Determine whether the criteria for waste collection by appointment are met.
 */
export const collectionByAppointmentApplies = ({
  afvalwijzerBasisroutetypeCode,
  afvalwijzerFractieCode,
}: WasteGuideResponseFraction) => {
  if (afvalwijzerFractieCode !== FractionCode.Rest) {
    return false
  }

  return afvalwijzerBasisroutetypeCode === collectionByAppointmentCode
}

/**
 * When the criteria for waste collection by appointment are met, all fractions, except "grof afval", are combined into a single fraction, which has the date of the "rest" fraction, but a different title.
 */
export const getFractionsForCollectionByAppointment = (
  fractions: WasteGuideResponseFraction[],
) => {
  const combinedFractions: WasteGuideResponseFraction[] = []

  for (const fraction of fractions) {
    const {afvalwijzerFractieCode} = fraction
    if (afvalwijzerFractieCode === FractionCode.GA) {
      combinedFractions.push(applyCustomFractionTitle(fraction))
    } else if (afvalwijzerFractieCode === FractionCode.Rest) {
      combinedFractions.unshift({
        ...fraction,
        afvalwijzerFractieNaam: collectionByAppointmentTitle,
      })
    }
  }

  return combinedFractions
}

/**
 * Post-process the waste fractions: filter out (temporarily) disabled fractions, rename the titles, sort them and handle the "collection by appointment" case.
 */
export const getFractions = (wasteGuide: WasteGuideResponseFraction[]) => {
  if (wasteGuide.find(collectionByAppointmentApplies)) {
    return getFractionsForCollectionByAppointment(wasteGuide)
  }

  return wasteGuide
    .filter(fractionIsSupported)
    .map(applyCustomFractionTitle)
    .sort(sortFractions)
}
