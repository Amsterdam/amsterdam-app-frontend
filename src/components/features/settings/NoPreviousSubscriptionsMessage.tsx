import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {MenuStackParams, TabParams} from '../../../app/navigation'
import {menuRoutes, tabRoutes} from '../../../app/navigation/routes'
import {Attention, Text, TextButton} from '../../ui'
import {Column} from '../../ui/layout'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<MenuStackParams & TabParams, 'ProjectOverview'>
    >()

  return (
    <Column gutter="md">
      <Attention>
        <Text>
          U kunt nu kiezen van welke bouwprojecten u berichten wilt ontvangen.
        </Text>
      </Attention>
      <TextButton
        emphasis
        onPress={() =>
          navigation.navigate(tabRoutes.menu.name, {
            screen: menuRoutes.projectOverview.name,
          })
        }
        text="Naar bouwprojecten"
      />
    </Column>
  )
}
