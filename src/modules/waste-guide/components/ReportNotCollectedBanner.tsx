import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {BannerCard} from '../../../components/features'
import {WasteGuideRouteName} from '../routes'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WasteGuideModule'>
}

export const ReportNotCollectedBanner = ({navigation}: Props) => {
  return (
    <BannerCard
      border
      imageSource={require('../../../assets/images/banner-afval-niet-opgehaald.jpg')}
      onPress={() =>
        navigation.navigate(WasteGuideRouteName.reportNotCollected)
      }
      subtitle="Meld het, dan komen we langs!"
      title="Is het afval niet opgehaald?"
    />
  )
}