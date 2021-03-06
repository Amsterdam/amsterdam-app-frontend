import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {Box, Card, CardBody, Image, Text, Title} from '../../components/ui'
import {Gutter} from '../../components/ui/layout'

export const WhereToPutBulkyWasteScreen = () => (
  <ScrollView>
    <Box background="white">
      <Title text="Buiten zetten of naar een afvalpunt?" />
      <Gutter height="sm" />
      <Text>
        Grof afval zijn grote spullen die niet in een vuilniszak of ondergrondse
        afvalcontainer passen.
      </Text>
    </Box>
    <Box>
      <Card>
        <CardBody>
          <View style={styles.figure}>
            <Image
              source={require('../../assets/images/grofafval-buiten.png')}
              style={styles.image}
            />
          </View>
          <Gutter height="md" />
          <Title level={2} text="Grof afval dat we ophalen" />
          <Text>
            Spullen uit uw woning die niet passen in een ondergrondse container.
            Bijvoorbeeld een bank, stoel, kast, bed, tuinmeubel, tapijt, plank,
            matras en grote elektrische apparaten (ijskast en wasmachine).
          </Text>
        </CardBody>
      </Card>
      <Gutter height="md" />
      <Card>
        <CardBody>
          <View style={styles.figure}>
            <Image
              source={require('../../assets/images/grofafval-afvalpunt.png')}
              style={styles.image}
            />
          </View>
          <Gutter height="md" />
          <Title
            level={2}
            text="Dit mag weggebracht worden naar een afvalpunt"
          />
          <Text>
            Bouw- en sloopafval, tuintegels, klein chemisch afval, kleine
            elektrische apparaten, auto-onderdelen, overige motoren, stenen,
            zand, aarde, autobanden, karton en glas(platen).
          </Text>
        </CardBody>
      </Card>
    </Box>
  </ScrollView>
)

const styles = StyleSheet.create({
  figure: {
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 632 / 196,
    flexShrink: 1,
  },
})
