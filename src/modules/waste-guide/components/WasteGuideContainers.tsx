import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Box, Text, Title} from '@/components/ui'
import {TextButton} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'

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
      </Column>
    </Box>
  )
}
