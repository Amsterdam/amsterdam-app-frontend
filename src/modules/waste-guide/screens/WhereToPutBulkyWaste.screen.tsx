import React from 'react'
import {Box} from '@/components/ui'
import {Column, Screen} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {List, Paragraph, Title} from '@/components/ui/text'
import {
  BringingBulkyWasteByCarImage,
  PuttingBulkyWasteAtTheRoadsideImage,
} from '@/modules/waste-guide/assets/images'

const collected = [
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

const notCollected = [
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

export const WhereToPutBulkyWasteScreen = () => (
  <Screen>
    <Box>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title text="Buiten zetten of naar een Afvalpunt?" />
          <Paragraph>
            Grof afval zijn grote spullen die niet in een vuilniszak of
            ondergrondse afvalcontainer passen. We halen niet alle grote spullen
            op. Sommige dingen moet u zelf wegbrengen naar een Afvalpunt. Voor
            bewoners is dit gratis.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Figure height={192}>
            <PuttingBulkyWasteAtTheRoadsideImage />
          </Figure>
          <Column gutter="sm">
            <Title level="h3" text="Grof afval dat we ophalen" />
            <Paragraph>
              Grote spullen uit uw woning halen we op, zoals:
            </Paragraph>
          </Column>
          <List items={collected} />
        </Column>
        <Column gutter="md">
          <Figure height={192}>
            <BringingBulkyWasteByCarImage />
          </Figure>
          <Column gutter="sm">
            <Title level="h3" text="Dit grof afval halen we niet op" />
            <Paragraph>
              Deze spullen moet u zelf wegbrengen naar een Afvalpunt.
            </Paragraph>
          </Column>
          <List items={notCollected} />
        </Column>
      </Column>
    </Box>
  </Screen>
)
