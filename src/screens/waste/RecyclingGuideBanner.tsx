import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../../App'
import {BannerCard} from '../../components/features'

export const RecyclingGuideBanner = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'WebView'>>()

  return (
    <BannerCard
      border
      imageSource={require('../../assets/images/banner-illustratie-welkafvalhoortwaar.png')}
      onPress={() =>
        navigation.navigate(routes.webView.name, {
          title: 'Afvalscheidingswijzer',
          uri: 'https://www.afvalscheidingswijzer.nl',
        })
      }
      subtitle="Bekijk de afvalscheidingswijzer"
      title="Welk afval hoort waar?"
    />
  )
}
