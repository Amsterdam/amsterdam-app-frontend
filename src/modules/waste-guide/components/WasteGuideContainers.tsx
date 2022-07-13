import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Box, Text, Title} from '../../../components/ui'
import {Column, Row} from '../../../components/ui/layout'
import {Image} from '../../../components/ui/media'
import {WasteGuideRouteName, WasteGuideStackParams} from '../routes'
import {TextButton} from '@/components/ui/buttons'

export const WasteGuideContainers = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  return (
    <Box>
      <Column gutter="md">
        <Title level={2} text="Containers in de buurt" />
        <Text>
          Zoekt u een container voor glas, papier, textiel, plastic verpakkingen
          of restafval?
        </Text>
        <Row align="start">
          <TextButton
            direction="forward"
            label="Bekijk de kaart met containers in de buurt"
            onPress={() =>
              navigation.navigate(WasteGuideRouteName.wasteGuideContainers)
            }
          />
        </Row>
        <Row>
          <Image
            customAspectRatio={632 / 220}
            source={require('../../../assets/images/placeholder-map-containers.jpg')}
          />
        </Row>
      </Column>
    </Box>
  )
}
