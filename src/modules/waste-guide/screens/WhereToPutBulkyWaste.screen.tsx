import React from 'react'
import {ImageSourcePropType} from 'react-native'
import {Box, Text, Title} from '@/components/ui'
import {Gutter, Row, Screen} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'

export const WhereToPutBulkyWasteScreen = () => (
  <Screen>
    <Box>
      <Title text="Buiten zetten of naar een afvalpunt?" />
      <Gutter height="sm" />
      <Text>
        Grof afval zijn grote spullen die niet in een vuilniszak of ondergrondse
        afvalcontainer passen.
      </Text>
    </Box>
    <Box>
      <Row>
        <Image
          customAspectRatio={632 / 196}
          source={
            require('@/assets/images/grofafval-buiten.png') as ImageSourcePropType
          }
        />
      </Row>
      <Gutter height="md" />
      <Title level={2} text="Grof afval dat we ophalen" />
      <Text>
        Spullen uit uw woning die niet passen in een ondergrondse container.
        Bijvoorbeeld een bank, stoel, kast, bed, tuinmeubel, tapijt, plank,
        matras en grote elektrische apparaten (ijskast en wasmachine).
      </Text>
    </Box>
    <Box>
      <Row>
        <Image
          customAspectRatio={632 / 196}
          source={
            require('@/assets/images/grofafval-afvalpunt.png') as ImageSourcePropType
          }
        />
      </Row>
      <Gutter height="md" />
      <Title level={2} text="Dit mag weggebracht worden naar een afvalpunt" />
      <Text>
        Bouw- en sloopafval, tuintegels, klein chemisch afval, kleine
        elektrische apparaten, auto-onderdelen, overige motoren, stenen, zand,
        aarde, autobanden, karton en glas(platen).
      </Text>
    </Box>
  </Screen>
)
