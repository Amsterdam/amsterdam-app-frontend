import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuScreenOptions, MenuStackParamList} from '../../App/navigation'
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
