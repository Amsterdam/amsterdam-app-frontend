import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {BannerCard} from '../../components/features'
import {selectAddress} from '../../components/features/address/addressSlice'
import {getEnvironment} from '../../environment'

type Props = {
  navigation: StackNavigationProp<StackParams, 'WebView'>
}

export const ReportNotCollectedBanner = ({navigation}: Props) => {
  const {primary: address} = useSelector(selectAddress)

  return (
    <BannerCard
      border
      imageSource={require('../../assets/images/banner-afval-niet-opgehaald.jpg')}
      onPress={() =>
        navigation.navigate(routes.webView.name, {
          title: 'Melden',
          url: `${getEnvironment().signalsBaseUrl}/categorie/afval/grofvuil`,
          urlParams: {
            lat: address?.centroid[1] ?? 0,
            lng: address?.centroid[0] ?? 0,
          },
        })
      }
      subtitle="Meld het, dan komen we langs!"
      title="Is het afval niet opgehaald?"
    />
  )
}
