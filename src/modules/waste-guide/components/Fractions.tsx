import {useContext, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {FlexStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import {SimpleGrid} from 'react-native-super-grid'
import {Fraction} from '@/modules/waste-guide/components'
import {
  FractionCode,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

const temporarilyDisabledFraction = FractionCode.Plastic // TODO: Remove when plastic is supported again

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

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
  [FractionCode.Papier]: 'Papier en Karton',
  [FractionCode.Plastic]: 'Plastic',
  [FractionCode.Rest]: 'Restafval',
  [FractionCode.Textiel]: 'Textiel',
}

const sortFractions = (
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

const applyCustomFractionTitle = (
  fraction: WasteGuideResponseFraction,
): WasteGuideResponseFraction => ({
  ...fraction,
  afvalwijzerFractieNaam: customFractionTitles[fraction.afvalwijzerFractieCode],
})

export const Fractions = ({wasteGuide}: Props) => {
  const fractions = useMemo(
    () =>
      wasteGuide
        .map(applyCustomFractionTitle)
        .filter(f => f.afvalwijzerFractieCode !== temporarilyDisabledFraction)
        .sort(sortFractions),
    [wasteGuide],
  )

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 20 * size.spacing.md * Math.max(fontScale, 1)
  const gutter = size.spacing.xl

  const styles = createStyles(gutter)

  return (
    <SimpleGrid
      data={fractions}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={fraction => fraction.afvalwijzerFractieCode}
      listKey="fractions"
      renderItem={({item}) => <Fraction fraction={item} />}
      spacing={gutter}
      style={styles.grid}
    />
  )
}

const createStyles = (gutter: FlexStyle['margin']) =>
  StyleSheet.create({
    grid: {
      margin: gutter && -gutter,
    },
    itemContainer: {
      justifyContent: 'flex-start',
    },
  })
