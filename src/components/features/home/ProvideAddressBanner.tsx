import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {StackParams, TabParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {useAsyncStorage} from '../../../hooks'
import {Address} from '../../../types'
import {PleaseWait} from '../../ui'
import {Gutter} from '../../ui/layout'
import {BannerCard} from '../BannerCard'
import {selectAddress} from '../address/addressSlice'

export const ProvideAddressBanner = () => {
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()
  const [address, setAddress] = useState<Address | undefined>()
  const {primary: primaryAddress} = useSelector(selectAddress)

  useEffect(() => {
    asyncStorage.getValue<Address>('address').then(storedAddress => {
      setAddress(storedAddress)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAddress(primaryAddress)
  }, [primaryAddress])

  if (asyncStorage.isLoading) {
    return <PleaseWait />
  }

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
