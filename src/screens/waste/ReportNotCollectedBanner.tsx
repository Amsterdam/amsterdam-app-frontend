import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {BannerCard} from '../../components/features'
import {getEnvironment} from '../../environment'
import {SettingsContext} from '../../providers'

type Props = {
  navigation: StackNavigationProp<StackParams, 'WebView'>
}

export const ReportNotCollectedBanner = ({navigation}: Props) => {
  const {settings} = useContext(SettingsContext)
  const {address} = {...settings}

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
