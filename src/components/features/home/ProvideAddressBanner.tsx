import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {StackParams, TabParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {Gutter} from '../../ui/layout'
import {BannerCard} from '../BannerCard'
import {selectAddress} from '../address/addressSlice'

export const ProvideAddressBanner = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()
  const {primary: address} = useSelector(selectAddress)

  if (address) {
    return null
  }

  return (
    <>
      <BannerCard
        border
        imageSource={require('../../../assets/images/banner-provide-address.jpg')}
        onPress={() => navigation.navigate(routes.addressForm.name)}
        subtitle="Vul dan uw adres in."
        title="Wilt u informatie uit uw buurt?"
      />
      <Gutter height="lg" />
    </>
  )
}
