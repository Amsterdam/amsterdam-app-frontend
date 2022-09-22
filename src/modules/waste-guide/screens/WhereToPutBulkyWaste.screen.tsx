import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

const blacklist = [
  'Karton (U kunt karton ook kwijt in de papiercontainer)',
  'Bouw- en sloopafval',
  'Tuintegels',
  'Klein chemisch afval',
  'Kleine elektrische apparaten',
  'Auto-onderdelen',
  'Overige motoren',
  'Stenen, zand en aarde',
  'Autobanden',
  'Glasplaten en spiegels.',
]

const whitelist = [
  'Banken',
  'Stoelen',
  'Kasten',
  'Bedden en matrassen',
  'Tuinmeubels',
  'Tuinafval',
  'Tapijten en vloerbedekking',
  'Planken',
  'Grote electrische apparaten zoals een koelkast of wasmachine',
]

type UnlistedItemsProps = {
  list: string[]
}

const UnlistedItems = ({list}: UnlistedItemsProps) => {
  const styles = useThemable(createStyles)
  return (
    <Box insetHorizontal="sm">
      {list.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.itemContainer}>
          <Row gutter="sm">
            <Phrase>{'\u2022'}</Phrase>
            <Phrase>{item}</Phrase>
          </Row>
        </View>
      ))}
    </Box>
  )
}

export const WhereToPutBulkyWasteScreen = () => {
  return (
    <Screen>
      <Box>
        <Column gutter="sm">
          <Title text="Buiten zetten of naar een afvalpunt?" />
          <Paragraph>
            Grof afval zijn grote spullen die niet in een vuilniszak of
            ondergrondse afvalcontainer passen. We halen niet alle grote spullen
            op. Sommige dingen moet u zelf wegbrengen naar een Afvalpunt. Voor
            bewoners is dit gratis.
          </Paragraph>
        </Column>
      </Box>
      <Box>
        <Title level="h2" text="Grof afval dat we ophalen" />
        <Paragraph>Grote spullen uit uw woning halen we op, zoals:</Paragraph>
        <UnlistedItems list={whitelist} />
      </Box>
      <Box>
        <Title level="h2" text="Dit grof afval halen we niet op" />
        <Column gutter="sm">
          <Paragraph>
            Deze spullen moet u zelf wegbrengen naar een Afvalpunt.
          </Paragraph>
          <UnlistedItems list={blacklist} />
        </Column>
      </Box>
    </Screen>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    itemContainer: {
      marginBottom: size.spacing.sm,
    },
  })
