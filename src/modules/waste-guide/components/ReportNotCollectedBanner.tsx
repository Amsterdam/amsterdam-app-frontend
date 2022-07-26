import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {ImageSourcePropType} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {BannerCard} from '@/components/features'
import {ModuleSlug} from '@/modules/slugs'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    typeof ModuleSlug['waste-guide']
  >
}

export const ReportNotCollectedBanner = ({navigation}: Props) => {
  return (
    <BannerCard
      imageSource={
        require('@/assets/images/banner-afval-niet-opgehaald.jpg') as ImageSourcePropType
      }
      onPress={() =>
        navigation.navigate(WasteGuideRouteName.reportNotCollected)
      }
      subtitle="Meld het, dan komen we langs!"
      title="Is het afval niet opgehaald?"
    />
  )
}
