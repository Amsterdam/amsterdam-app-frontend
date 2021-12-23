import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuScreenOptions, MenuStackParamList} from '../../../App/navigation'
import {Attention, Text, TextButton} from '../../ui'
import {Column} from '../../ui/layout'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'ProjectOverview'>>()

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
        onPress={() =>
          navigation.navigate(menuScreenOptions.projectOverview.name)
        }
        text="Naar bouwprojecten"
      />
    </Column>
  )
}
