import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {TextButton, Title} from '../../ui'
import {Column} from '../../ui/layout'

export const QuickLinks = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()

  return (
    <Column gutter="sm">
      <Title level={2} text="Direct naar" />
      <TextButton
        direction="forward"
        onPress={() => navigation.navigate(routes.wasteGuide.name)}
        text="Afvalinformatie op adres"
      />
      <TextButton
        direction="forward"
        onPress={() => navigation.navigate(routes.projects.name)}
        text="Bouwprojecten in de buurt"
      />
    </Column>
  )
}
