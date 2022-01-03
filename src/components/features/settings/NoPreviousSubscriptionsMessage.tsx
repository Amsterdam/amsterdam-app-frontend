import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuRoutes, MenuStackParams} from '../../../App/navigation'
import {Attention, Text, TextButton} from '../../ui'
import {Column} from '../../ui/layout'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParams, 'ProjectOverview'>>()

  return (
    <Column gutter="md">
      <Attention>
        <Text>
          Zet berichten aan op pagina’s van bouwprojecten waar u berichten voor
          wilt ontvangen.
        </Text>
      </Attention>
      <TextButton
        emphasis
        onPress={() => navigation.navigate(menuRoutes.projectOverview.name)}
        text="Naar bouwprojecten"
      />
    </Column>
  )
}
