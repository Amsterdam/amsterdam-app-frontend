import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {BannerCard} from '@/components/features'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'

export const RecyclingGuideBanner = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  return (
    <BannerCard
      imageSource={require('../../../assets/images/banner-illustratie-welkafvalhoortwaar.png')}
      onPress={() => navigation.navigate(WasteGuideRouteName.recyclingGuide)}
      subtitle="Bekijk de afvalscheidingswijzer"
      title="Welk afval hoort waar?"
    />
  )
}
