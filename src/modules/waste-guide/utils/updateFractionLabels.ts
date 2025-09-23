import {WasteType, FractionCode} from '@/modules/waste-guide/types'

export const updateFractionLabels = (fractions: WasteType[]) =>
  fractions.map(fraction => ({
    ...fraction,
    label: fractionTitles[fraction.code] || fraction.label,
  }))

const fractionTitles = {
  [FractionCode.GA]: 'Grof afval',
  [FractionCode.GFT]: 'Groente-, fruit-, etensresten en tuinafval (gfe/t)',
  [FractionCode.Glas]: 'Glas',
  [FractionCode.Papier]: 'Papier en karton',
  [FractionCode.Plastic]: 'Plastic',
  [FractionCode.Rest]: 'Restafval',
  [FractionCode.Textiel]: 'Textiel',
}
