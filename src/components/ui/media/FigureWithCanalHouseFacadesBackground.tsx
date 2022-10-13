import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Figure, FigureProps} from '@/components/ui/media/Figure'
import {CanalHouseFacadesImage} from '@/modules/waste-guide/assets/images'
import {Theme, useThemable} from '@/themes'

type SelectedFigureProps = Pick<FigureProps, 'aspectRatio'> &
  Required<Pick<FigureProps, 'height'>>

type Props = {
  backgroundImageHeight?: number
  Image: ReactNode
  imageAspectRatio: number
  imageWidth?: number
} & SelectedFigureProps

export const FigureWithCanalHouseFacadesBackground = ({
  backgroundImageHeight = 160,
  Image,
  imageAspectRatio,
  imageWidth,
  ...figureProps
}: Props) => {
  const styles = useThemable(
    createStyles(
      backgroundImageHeight,
      imageAspectRatio,
      figureProps,
      imageWidth,
    ),
  )

  return (
    <Figure {...figureProps}>
      <View style={styles.backgroundImage}>
        <CanalHouseFacadesImage />
      </View>
      <View style={styles.image}>{Image}</View>
    </Figure>
  )
}

const createStyles =
  (
    backgroundImageHeight: number,
    imageAspectRatio: Props['imageAspectRatio'],
    figureProps: SelectedFigureProps,
    requestedImageWidth: Props['imageWidth'],
  ) =>
  ({media}: Theme) => {
    const {aspectRatio, height: figureHeight} = figureProps
    const figureWidth =
      figureHeight * media.aspectRatio[aspectRatio ?? 'default']
    const imageWidth = requestedImageWidth ?? figureWidth
    const imageHeight = imageWidth / imageAspectRatio

    return StyleSheet.create({
      backgroundImage: {
        aspectRatio: 1743 / 202,
        position: 'absolute',
        height: backgroundImageHeight,
        marginBottom: figureHeight - backgroundImageHeight,
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
