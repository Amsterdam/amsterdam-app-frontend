import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Card, CardBody, CardHeader, Text, Title} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {Image} from '../../../components/ui/media'
import {WasteGuideRouteName, WasteGuideStackParams} from '../routes'
import {TextButton} from '@/components/ui/buttons'

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
        <Row>
          <Image
            customAspectRatio={632 / 220}
            source={require('../../../assets/images/placeholder-map-containers.jpg')}
          />
        </Row>
      </CardBody>
    </Card>
  )
}
