import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import HeroImage from '../../assets/images/project-warning-hero.svg'
import {selectTheme} from '../../themes'

export const Hero = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <View style={{aspectRatio: theme.image.aspectRatio.hero}}>
      <HeroImage />
    </View>
  )
}
