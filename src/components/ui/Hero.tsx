import React from 'react'
import {StyleSheet, View} from 'react-native'
import HeroImage from '@/assets/images/project-warning-hero.svg'
import {Theme, useThemable} from '@/themes'

export const Hero = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.aspectRatio}>
      <HeroImage />
    </View>
  )
}

const createStyles = ({media}: Theme) =>
  StyleSheet.create({
    aspectRatio: {
      aspectRatio: media.aspectRatio.hero,
    },
  })
