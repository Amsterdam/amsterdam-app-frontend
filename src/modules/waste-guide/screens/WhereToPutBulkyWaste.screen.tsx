import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {
  BulkyWasteCollected,
  BulkyWasteNotCollected,
} from '@/modules/waste-guide/assets/images'
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
  'Glasplaten en spiegels',
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
  'Grote elektrische apparaten, zoals een koelkast of wasmachine',
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

export const WhereToPutBulkyWasteScreen = () => (
  <Screen>
    <Box>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title text="Buiten zetten of naar een afvalpunt?" />
          <Paragraph>
            Grof afval zijn grote spullen die niet in een vuilniszak of
            ondergrondse afvalcontainer passen. We halen niet alle grote spullen
            op. Sommige dingen moet u zelf wegbrengen naar een Afvalpunt. Voor
            bewoners is dit gratis.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Figure height={192}>
            <BulkyWasteCollected />
          </Figure>
          <Column gutter="sm">
            <Title level="h3" text="Grof afval dat we ophalen" />
            <Paragraph>
              Grote spullen uit uw woning halen we op, zoals:
            </Paragraph>
          </Column>
          <UnlistedItems list={whitelist} />
        </Column>
        <Column gutter="md">
          <Figure height={192}>
            <BulkyWasteNotCollected />
          </Figure>
          <Column gutter="sm">
            <Title level="h3" text="Dit grof afval halen we niet op" />
            <Paragraph>
              Deze spullen moet u zelf wegbrengen naar een Afvalpunt.
            </Paragraph>
          </Column>
          <UnlistedItems list={blacklist} />
        </Column>
      </Column>
    </Box>
  </Screen>
)

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    itemContainer: {
      marginBottom: size.spacing.sm,
    },
  })
