import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuScreenOptions} from '../../App/navigation/screenOptions'
import {MenuStackParamList} from '../../App/navigation/types'
import {BannerCard} from '../../components/features'

export const RecyclingGuideBanner = () => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParamList, 'WebView'>>()

  return (
    <BannerCard
      border
      imageSource={require('../../assets/images/banner-illustratie-welkafvalhoortwaar.png')}
      onPress={() =>
        navigation.navigate(menuScreenOptions.webView.name, {
          title: 'Afvalscheidingswijzer',
          url: 'https://www.afvalscheidingswijzer.nl',
        })
      }
      subtitle="Bekijk de afvalscheidingswijzer"
      title="Welk afval hoort waar?"
    />
  )
}
