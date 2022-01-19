import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams, TabParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {BannerCard} from '../BannerCard'

export const ProvideAddressBanner = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()

  return (
    <BannerCard
      border
      imageSource={require('../../../assets/images/banner-provide-address.png')}
      onPress={() => navigation.navigate(routes.addressForm.name)}
      subtitle="Vul dan uw adres in."
      title="Wilt u informatie uit uw buurt?"
    />
  )
}
