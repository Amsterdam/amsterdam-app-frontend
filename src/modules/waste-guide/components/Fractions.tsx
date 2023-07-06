import {useContext, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {FlexStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import {SimpleGrid} from 'react-native-super-grid'
import {Fraction} from '@/modules/waste-guide/components'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {getFractions} from '@/modules/waste-guide/utils/fractions'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

export const Fractions = ({wasteGuide}: Props) => {
  const fractions = useMemo(() => getFractions(wasteGuide), [wasteGuide])

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
