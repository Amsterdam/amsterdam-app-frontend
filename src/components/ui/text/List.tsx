import React, {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {Column, Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme, useThemable} from '@/themes'

enum Marker {
  checkmark = '\u221a',
  square = '\u2022',
}

type ListProps = {
  items: string[]
  marker?: keyof typeof Marker
}

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
      <Phrase isListed>{text}</Phrase>
    </Row>
  )
}

export const List = ({items, marker = 'square'}: ListProps) => (
  <Column gutter="md">
    {items.map(text => (
      <ListItem key={text} {...{marker, text}} />
    ))}
  </Column>
)

const createStyles =
  () =>
  ({text}: Theme) =>
    StyleSheet.create({
      marker: {
        flexDirection: 'row',
        alignItems: 'center',
        width: text.lineHeight.body * text.fontSize.body, // TODO Change in line height branch
      },
    })
