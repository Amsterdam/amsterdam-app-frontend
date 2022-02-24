import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams, TabParams} from '../../../../app/navigation'
import {routes, tabs} from '../../../../app/navigation/routes'
import {Attention, Text, TextButton} from '../../../ui'
import {Column} from '../../../ui/layout'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Projects'>>()

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
          navigation.navigate(tabs.menu.name, {
            screen: routes.projects.name,
          })
        }
        text="Naar bouwprojecten"
      />
    </Column>
  )
}
