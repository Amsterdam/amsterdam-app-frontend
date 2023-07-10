import {useContext, useMemo} from 'react'
import {ScaledSize, StyleSheet, View, ViewStyle} from 'react-native'
import {Phrase} from '@/components/ui/text/Phrase'
import {ListMarkerGlyph, ListMarkerProp} from '@/components/ui/text/list/types'
import {DeviceContext} from '@/providers'

type Props = {
  additionalStyles?: ViewStyle
} & ListMarkerProp

export const ListItemMarker = ({marker}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useMemo(
    () => createListItemMarkerStyles(fontScale),
    [fontScale],
  )

  return (
    <View style={styles.marker}>
      <Phrase
        accessible={false}
        importantForAccessibility="no">
        {ListMarkerGlyph[marker]}
      </Phrase>
    </View>
  )
}

const createListItemMarkerStyles = (fontScale: ScaledSize['fontScale']) =>
  StyleSheet.create({
    marker: {
      width: 30 * fontScale, // Inferred from the design system, which specifies 40px against a 24px font size.
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
  })
