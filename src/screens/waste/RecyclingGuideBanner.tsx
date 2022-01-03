import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuRoutes, MenuStackParams} from '../../App/navigation'
import {BannerCard} from '../../components/features'

export const RecyclingGuideBanner = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParams, 'WebView'>>()

  return (
    <BannerCard
      border
      imageSource={require('../../assets/images/banner-illustratie-welkafvalhoortwaar.png')}
      onPress={() =>
        navigation.navigate(menuRoutes.webView.name, {
          title: 'Afvalscheidingswijzer',
          url: 'https://www.afvalscheidingswijzer.nl',
        })
      }
      subtitle="Bekijk de afvalscheidingswijzer"
      title="Welk afval hoort waar?"
    />
  )
}
