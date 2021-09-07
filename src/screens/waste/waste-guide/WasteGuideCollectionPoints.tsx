import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import {
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Image,
  Link,
  Text,
  Title,
} from '../../../components/ui'
import {size} from '../../../tokens'

export const WasteGuideCollectionPoints = () => (
  <Card>
    <CardHeader>
      <Title level={4} text="Afvalpunten" />
    </CardHeader>
    <CardBody>
      <Text>
        Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch afval en{' '}
        spullen voor de kringloop kwijt.
      </Text>
      <Gutter height={size.spacing.md} />
      <Link
        direction="forward"
        emphasis
        onPress={() =>
          Linking.openURL(
            'https://kaart.amsterdam.nl/#52.2744/4.7151/52.4355/5.0667/brt/9776/244/',
          )
        }
        text="Bekijk de kaart met afvalpunten in de buurt"
      />
      <Gutter height={size.spacing.md} />
      <View style={styles.figure}>
        <Image
          source={require('../../../assets/images/placeholder-map-collection-points.jpg')}
          style={styles.image}
        />
      </View>
    </CardBody>
  </Card>
)

const styles = StyleSheet.create({
  figure: {
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 638 / 220,
    flexShrink: 1,
  },
})
