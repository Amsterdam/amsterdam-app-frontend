import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../app/navigation'
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
  TextButton,
  Title,
} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {WasteGuideRouteName} from '../routes'

export const WasteGuideCollectionPoints = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'WasteGuideModule'>>()

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Afvalpunten" />
      </CardHeader>
      <CardBody>
        <Text>
          Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch afval en{' '}
          spullen voor de kringloop kwijt.
        </Text>
        <Gutter height="md" />
        <Row align="start">
          <TextButton
            direction="forward"
            onPress={() =>
              navigation.navigate(
                WasteGuideRouteName.wasteGuideCollectionPoints,
              )
            }
            text="Bekijk de kaart met afvalpunten in de buurt"
          />
        </Row>
        <Gutter height="md" />
        <View style={styles.figure}>
          <Image
            source={require('../../../assets/images/placeholder-map-collection-points.jpg')}
            style={styles.image}
          />
        </View>
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  figure: {
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 638 / 220,
    flexShrink: 1,
  },
})
