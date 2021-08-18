import React from 'react'
import Illustration from '../../assets/images/welk-afval-hoort-waar.svg'
import {BannerCard} from '../../components/features'
import {openWebUrl} from '../../utils/openWebUrl'

export const WasteRecyclingBanner = () => (
  <BannerCard
    imageComponent={<Illustration />}
    onPress={() => openWebUrl('https://www.afvalscheidingswijzer.nl')}
    subtitle="Bekijk de afvalscheidingswijzer"
    title="Welk afval hoort waar?"
  />
)
