import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Figure} from '@/components/ui/media'
import ProjectWarningFallbackImageSource from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {CanalHouseFacadesImage} from '@/modules/waste-guide/assets/images'
import {Theme, useThemable} from '@/themes'

export const ProjectWarningFallbackFigure = () => {
  const height = 192
  const styles = useThemable(createStyles(height))

  return (
    <Figure height={height}>
      <View style={styles.backgroundImage}>
        <CanalHouseFacadesImage />
      </View>
      <View style={styles.image}>
        <ProjectWarningFallbackImageSource />
      </View>
    </Figure>
  )
}

const createStyles =
  (figureHeight: number) =>
  ({media}: Theme) => {
    const imageAspectRatio = 355 / 135
    const imageWidth = figureHeight * media.aspectRatio.default
    const imageHeight = imageWidth / imageAspectRatio

    return StyleSheet.create({
      backgroundImage: {
        position: 'absolute',
        height: 192,
        aspectRatio: 1743 / 202,
        paddingBottom: 32,
        alignSelf: 'center',
      },
      image: {
        height: imageHeight,
        aspectRatio: imageAspectRatio,
        marginTop: figureHeight - imageHeight, // Absolute positioning with `bottom: 0` doesn’t seem to work.
      },
    })
  }
