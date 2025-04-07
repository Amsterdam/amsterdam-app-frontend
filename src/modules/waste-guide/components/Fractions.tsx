import {pascalCase} from 'pascal-case'
import {StyleSheet} from 'react-native'
import {FlexStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import {SimpleGrid} from '@/components/ui/containers/SimpleGrid'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Fraction} from '@/modules/waste-guide/components/Fraction'
import {useFractions} from '@/modules/waste-guide/hooks/useFractions'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {useTheme} from '@/themes/useTheme'

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

export const Fractions = ({wasteGuide}: Props) => {
  const fractions = useFractions(wasteGuide)

  const {fontScale} = useDeviceContext()
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
      renderItem={({item}) => (
        <Fraction
          fraction={item}
          testID={`WasteGuide${pascalCase(item.afvalwijzerFractieNaam ?? '')}`}
        />
      )}
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
