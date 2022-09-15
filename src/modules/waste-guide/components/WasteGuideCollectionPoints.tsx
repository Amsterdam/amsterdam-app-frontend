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

export const WasteGuideCollectionPoints = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  return (
    <Box>
      <Column gutter="md">
        <Title level={2} text="Afvalpunten" />
        <Text>
          Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch afval en{' '}
          spullen voor de kringloop kwijt.
        </Text>
        <Row align="start">
          <TextButton
            direction="forward"
            label="Bekijk de kaart met afvalpunten in de buurt"
            onPress={() =>
              navigation.navigate(
                WasteGuideRouteName.wasteGuideCollectionPoints,
              )
            }
          />
        </Row>
      </Column>
    </Box>
  )
}
