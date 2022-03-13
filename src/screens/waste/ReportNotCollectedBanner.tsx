import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {BannerCard} from '../../components/features'
import {getEnvironment} from '../../environment'
import {useAsyncStorage} from '../../hooks'
import {Address} from '../../types'

type Props = {
  navigation: StackNavigationProp<StackParams, 'WebView'>
}

export const ReportNotCollectedBanner = ({navigation}: Props) => {
  const asyncStorage = useAsyncStorage()
  const [address, setAddress] = useState<Address | undefined>()

  useEffect(() => {
    asyncStorage
      .getValue<Address>('address')
      .then(storedAddress => setAddress(storedAddress))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BannerCard
      border
      imageSource={require('../../assets/images/banner-afval-niet-opgehaald.jpg')}
      onPress={() =>
        navigation.navigate(routes.webView.name, {
          title: 'Melden',
          url: `${getEnvironment().signalsBaseUrl}/categorie/afval/grofvuil`,
          urlParams: {
            lat: address?.centroid[1],
            lng: address?.centroid[0],
          },
        })
      }
      subtitle="Meld het, dan komen we langs!"
      title="Is het afval niet opgehaald?"
    />
  )
}
