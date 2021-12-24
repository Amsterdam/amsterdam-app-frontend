import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {menuScreenOptions, MenuStackParamList} from '../../App/navigation'
import {BannerCard} from '../../components/features'
import {getEnvironment} from '../../environment'
import {AddressContext} from '../../providers'

type Props = {
  navigation: StackNavigationProp<MenuStackParamList, 'WebView'>
}

export const ReportNotCollectedBanner = ({navigation}: Props) => {
  const addressContext = useContext(AddressContext)

  return (
    <BannerCard
      border
      imageSource={require('../../assets/images/banner-afval-niet-opgehaald.jpg')}
      onPress={() =>
        navigation.navigate(menuScreenOptions.webView.name, {
          title: 'Melden',
          url: `${getEnvironment().signalsBaseUrl}/categorie/afval/grofvuil`,
          urlParams: {
            lat: addressContext.address?.centroid[1],
            lng: addressContext.address?.centroid[0],
          },
        })
      }
      subtitle="Meld het, dan komen we langs!"
      title="Is het afval niet opgehaald?"
    />
  )
}
