import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

enum Marker {
  checkmark = '\u221a',
  square = '\u2022',
}

type ListProps = {
  items: string[]
  marker?: keyof typeof Marker
} & TestProps

type ListItemProps = {
  text: string
} & Required<Pick<ListProps, 'marker'>>

const ListItem = ({text, marker}: ListItemProps) => {
  const createdStyles = useMemo(createStyles, [])
  const styles = useThemable(createdStyles)

  return (
    <Row gutter="sm">
      <View style={styles.marker}>
        <Phrase accessible={false} importantForAccessibility="no">
          {Marker[marker]}
        </Phrase>
      </View>
      <Phrase>{text}</Phrase>
    </Row>
  )
}

export const List = ({items, marker = 'square', testID}: ListProps) => (
  <SingleSelectable
    accessibilityLabel={accessibleText(...items)}
    testID={testID}>
    <Column gutter="md">
      {items.map(text => (
        <ListItem key={text} {...{marker, text}} />
      ))}
    </Column>
  </SingleSelectable>
)

const createStyles =
  () =>
  ({text}: Theme) =>
    StyleSheet.create({
      marker: {
        alignItems: 'center',
        width: text.lineHeight.body * text.fontSize.body, // TODO Change in line height branch
      },
    })
