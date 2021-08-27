import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../../App'
import {BannerCard} from '../../components/features'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WebView'>
}

export const ReportNotCollectedBanner = ({navigation}: Props) => (
  <BannerCard
    border
    imageSource={require('../../assets/images/banner-foto-afval.jpg')}
    onPress={() =>
      navigation.navigate(routes.webView.name, {
        uri: 'https://acc.meldingen.amsterdam.nl/categorie/afval/grofvuil',
      })
    }
    subtitle="Meld het, dan komen we langs!"
    title="Is het afval niet opgehaald?"
  />
)
