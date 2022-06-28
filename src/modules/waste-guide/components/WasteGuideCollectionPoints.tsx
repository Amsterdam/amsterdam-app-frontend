import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Card, CardBody, CardHeader, Text, Title} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {Image} from '../../../components/ui/media'
import {WasteGuideRouteName, WasteGuideStackParams} from '../routes'
import {TextButton} from '@/components/ui/buttons'

export const WasteGuideCollectionPoints = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

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
        <Row>
          <Image
            customAspectRatio={638 / 220}
            source={require('../../../assets/images/placeholder-map-collection-points.jpg')}
          />
        </Row>
      </CardBody>
    </Card>
  )
}
