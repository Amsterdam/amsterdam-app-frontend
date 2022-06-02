import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
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
import {WasteGuideRouteName, WasteGuideStackParams} from '../routes'

export const WasteGuideContainers = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Containers in de buurt" />
      </CardHeader>
      <CardBody>
        <Text>
          Zoekt u een container voor glas, papier, textiel, plastic verpakkingen
          of restafval?
        </Text>
        <Gutter height="md" />
        <Row align="start">
          <TextButton
            direction="forward"
            onPress={() =>
              navigation.navigate(WasteGuideRouteName.wasteGuideContainers)
            }
            text="Bekijk de kaart met containers in de buurt"
          />
        </Row>
        <Gutter height="md" />
        <View style={styles.figure}>
          <Image
            source={require('../../../assets/images/placeholder-map-containers.jpg')}
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
    aspectRatio: 632 / 220,
    flexShrink: 1,
  },
})
