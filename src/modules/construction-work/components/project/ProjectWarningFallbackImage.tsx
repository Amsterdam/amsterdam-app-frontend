import React from 'react'
import {StyleSheet, View} from 'react-native'
import ProjectWarningFallbackImageSource from '@/modules/construction-work/assets/images/project-warning-fallback-image.svg'
import {Theme, useThemable} from '@/themes'

export const ProjectWarningFallbackImage = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.aspectRatio}>
      <ProjectWarningFallbackImageSource />
    </View>
  )
}

const createStyles = ({media}: Theme) =>
  StyleSheet.create({
    aspectRatio: {
      aspectRatio: media.aspectRatio.hero,
    },
  })
