import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {
  homeRoutes,
  HomeStackParams,
  TabParams,
  tabRoutes,
} from '../../../App/navigation'
import {BannerCard} from '../BannerCard'

export const BestWishes21Banner = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<HomeStackParams & TabParams, 'BestWishes21'>
    >()

  return (
    <BannerCard
      border
      imageSource={require('../../../assets/images/best-wishes-21/kerstbanner.gif')}
      onPress={() =>
        navigation.navigate(tabRoutes.home.name, {
          screen: homeRoutes.bestWishes21.name,
        })
      }
      subtitle="Eén app voor de Amsterdammer"
      title="Terugblikken & vooruitkijken"
    />
  )
}
