import {useContext, useMemo} from 'react'
import {ScaledSize, StyleSheet, View, ViewStyle} from 'react-native'
import {config} from '@/components/ui/config'
import {Phrase} from '@/components/ui/text/Phrase'
import {ListMarkerGlyph, ListMarkerProp} from '@/components/ui/text/list/types'
import {DeviceContext} from '@/providers'

type Props = {
  additionalStyles?: ViewStyle
} & ListMarkerProp

export const ListItemMarker = ({additionalStyles, marker}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useMemo(
    () => createListItemMarkerStyles(fontScale),
    [fontScale],
  )

  return (
    <View style={[styles.marker, additionalStyles]}>
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
      width: config.listItemMarkerBoxWidth * fontScale,
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
  })
