import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {
  AmsterdamAndWeespFacadesImage,
  AmsterdamFacadesImage,
} from '@/assets/images'
import {mapSelfAlignment} from '@/components/ui/layout'
import {Figure, FigureProps} from '@/components/ui/media/Figure'
import {Theme, useThemable} from '@/themes'

type SelectedFigureProps = Pick<FigureProps, 'aspectRatio'> &
  Required<Pick<FigureProps, 'height'>>

type Props = {
  backgroundImageHeightFraction?: number
  Image: ReactNode
  imageAlign?: 'start' | 'center' | 'end'
  imageAspectRatio: number
  imageWidth?: number
  withWeesp?: boolean
} & SelectedFigureProps

export const FigureWithFacadesBackground = ({
  backgroundImageHeightFraction = 5 / 6,
  Image,
  imageAlign = 'center',
  imageAspectRatio,
  imageWidth,
  withWeesp = false,
  ...figureProps
}: Props) => {
  const styles = useThemable(
    createStyles(
      backgroundImageHeightFraction,
      imageAlign,
      imageAspectRatio,
      figureProps,
      imageWidth,
    ),
  )

  const BackgroundImage = withWeesp
    ? AmsterdamAndWeespFacadesImage
    : AmsterdamFacadesImage

  return (
    <Figure {...figureProps}>
      <View style={styles.backgroundImage}>
        <BackgroundImage />
      </View>
      <View style={styles.image}>{Image}</View>
    </Figure>
  )
}

const createStyles =
  (
    backgroundImageHeightFraction: number,
    imageAlign: Props['imageAlign'],
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
    const backgroundImageHeight = figureHeight * backgroundImageHeightFraction

    return StyleSheet.create({
      backgroundImage: {
        aspectRatio: media.imageAspectRatio.facades,
        position: 'absolute',
        height: backgroundImageHeight,
        marginBottom: figureHeight - backgroundImageHeight,
        alignSelf: 'center',
      },
      image: {
        aspectRatio: imageAspectRatio,
        height: imageHeight,
        marginTop: figureHeight - imageHeight, // Absolute positioning with `bottom: 0` doesn’t seem to work.
        alignSelf: mapSelfAlignment(imageAlign),
      },
    })
  }
