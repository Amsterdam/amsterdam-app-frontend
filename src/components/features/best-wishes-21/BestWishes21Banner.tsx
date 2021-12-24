import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {
  homeScreenOptions,
  HomeStackParamList,
  RootStackParamList,
  tabNavOptions,
} from '../../../App/navigation'
import {BannerCard} from '../BannerCard'

export const BestWishes21Banner = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        HomeStackParamList & RootStackParamList,
        'BestWishes21'
      >
    >()

  return (
    <BannerCard
      border
      imageSource={require('../../../assets/images/best-wishes-21/kerstbanner.gif')}
      onPress={() =>
        navigation.navigate(tabNavOptions.home.name, {
          screen: homeScreenOptions.bestWishes21.name,
        })
      }
      subtitle="Eén app voor de Amsterdammer"
      title="Terugblikken & vooruitkijken"
    />
  )
}
