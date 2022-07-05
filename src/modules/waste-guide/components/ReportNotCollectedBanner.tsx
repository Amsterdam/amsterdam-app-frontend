import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '../../../app/navigation'
import {BannerCard} from '../../../components/features'
import {WasteGuideRouteName} from '../routes'
import {ModuleSlugs} from '@/modules/slugs'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    typeof ModuleSlugs['waste-guide']
  >
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
