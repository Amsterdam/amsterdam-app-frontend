import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Figure} from '@/components/ui/media/Figure'
import {CanalHouseFacadesImage} from '@/modules/waste-guide/assets/images'
import {Theme, useThemable} from '@/themes'

type Props = {
  height: number
  Image: ReactNode
  imageAspectRatio: number
  imageWidth?: number
}

export const FigureWithCanalHouseFacadesBackground = ({
  height,
  Image,
  imageAspectRatio,
  imageWidth,
}: Props) => {
  const styles = useThemable(createStyles(height, imageAspectRatio, imageWidth))

  return (
    <Figure height={height}>
      <View style={styles.backgroundImage}>
        <CanalHouseFacadesImage />
      </View>
      <View style={styles.image}>{Image}</View>
    </Figure>
  )
}

const createStyles =
  (
    figureHeight: Props['height'],
    imageAspectRatio: Props['imageAspectRatio'],
    requestedImageWidth: Props['imageWidth'],
  ) =>
  ({media}: Theme) => {
    const figureWidth = figureHeight * media.aspectRatio.default
    const imageWidth = requestedImageWidth ?? figureWidth
    const imageHeight = imageWidth / imageAspectRatio

    return StyleSheet.create({
      backgroundImage: {
        aspectRatio: 1743 / 202,
        position: 'absolute',
        height: 160,
        marginBottom: figureHeight - 160,
        alignSelf: 'center',
      },
      image: {
        aspectRatio: imageAspectRatio,
        height: imageHeight,
        marginTop: figureHeight - imageHeight, // Absolute positioning with `bottom: 0` doesn’t seem to work.
        alignSelf: 'center',
      },
    })
  }
