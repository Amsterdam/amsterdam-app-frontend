import React from 'react'
import {BannerCard} from '../../components/features'
import {openWebUrl} from '../../utils/openWebUrl'

export const RecyclingGuideBanner = () => (
  <BannerCard
    border
    imageSource={require('../../assets/images/banner-illustratie-welkafvalhoortwaar.png')}
    onPress={() => openWebUrl('https://www.afvalscheidingswijzer.nl')}
    subtitle="Bekijk de afvalscheidingswijzer"
    title="Welk afval hoort waar?"
  />
)
