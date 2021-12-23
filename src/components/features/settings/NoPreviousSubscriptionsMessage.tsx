import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../../App'
import {menuScreenOptions} from '../../../App/navigation/screenOptions'
import {Attention, Text, TextButton} from '../../ui'
import {Column} from '../../ui/layout'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

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
