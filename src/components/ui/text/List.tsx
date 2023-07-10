import {useContext, useMemo} from 'react'
import {ScaledSize, StyleSheet, View, ViewStyle} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {DeviceContext} from '@/providers'
import {accessibleText} from '@/utils'

enum ListMarkerGlyph {
  checkmark = '\u221a',
  square = '\u2022',
}

type ListMarkerProp = {
  marker: keyof typeof ListMarkerGlyph
}

type ListItemMarkerProps = {
  additionalStyles?: ViewStyle
} & ListMarkerProp

export const ListItemMarker = ({marker}: ListItemMarkerProps) => {
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

type ListItemProps = {
  text: string
} & ListMarkerProp

const ListItem = ({text, marker: marker}: ListItemProps) => (
  <Row>
    <ListItemMarker marker={marker} />
    <Phrase>{text}</Phrase>
  </Row>
)

type ListProps = {
  items: string[]
} & Partial<ListMarkerProp> &
  TestProps

export const List = ({items, marker = 'square', testID}: ListProps) => (
  <SingleSelectable
    accessibilityLabel={accessibleText(...items)}
    testID={testID}>
    <Column gutter="md">
      {items.map(text => (
        <ListItem
          key={text}
          {...{marker, text}}
        />
      ))}
    </Column>
  </SingleSelectable>
)

const createListItemMarkerStyles = (fontScale: ScaledSize['fontScale']) =>
  StyleSheet.create({
    marker: {
      width: 30 * fontScale, // Inferred from the design system, which specifies 40px against a 24px font size.
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: 'gold',
    },
  })
