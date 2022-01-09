import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {homeRoutes, HomeStackParams} from '../../../app/navigation'
import {TextButton, Title} from '../../ui'
import {Column} from '../../ui/layout'

export const QuickLinks = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, 'Home'>>()

  return (
    <Column gutter="sm">
      <Title level={2} text="Direct naar" />
      <TextButton
        direction="forward"
        onPress={() => navigation.navigate(homeRoutes.wasteGuide.name)}
        text="Afvalinformatie op adres"
      />
      <TextButton
        direction="forward"
        onPress={() => navigation.navigate(homeRoutes.projectOverview.name)}
        text="Bouwprojecten in de buurt"
      />
    </Column>
  )
}
