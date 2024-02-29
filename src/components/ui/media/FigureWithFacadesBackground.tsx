import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Figure, FigureProps} from '@/components/ui/media/Figure'
import {type TestProps} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type SelectedFigureProps = Pick<FigureProps, 'aspectRatio'> &
  Required<Pick<FigureProps, 'height'>>

type Props = {
  Image: ReactNode
  backgroundImageHeightFraction?: number
  imageAspectRatio: number
  imageWidth?: number
  /**
   * The number of pixels by which to move the figure up, sliding behind the content above it.
   * This is especially useful on landscape devices.
   */
  moveUp?: number
  withWeesp?: boolean
} & SelectedFigureProps &
  TestProps

export const FigureWithFacadesBackground = ({
  backgroundImageHeightFraction = 3 / 4,
  Image,
  imageAspectRatio,
  imageWidth,
  moveUp,
  testID,
  withWeesp = false,
  ...figureProps
}: Props) => {
  const styles = useThemable(
    createStyles(
      backgroundImageHeightFraction,
      imageAspectRatio,
      figureProps,
      moveUp,
      imageWidth,
    ),
  )

  const BackgroundImage = withWeesp
    ? AmsterdamAndWeespFacadesImage
    : AmsterdamFacadesImage

  return (
    <View
      style={styles.figure}
      testID={testID}>
      <Figure {...figureProps}>
        <View style={styles.backgroundImage}>
          <BackgroundImage />
        </View>
        <View style={styles.image}>{Image}</View>
      </Figure>
    </View>
  )
}

const createStyles =
  (
    backgroundImageHeightFraction: number,
    imageAspectRatio: Props['imageAspectRatio'],
    figureProps: SelectedFigureProps,
    moveUp: Props['moveUp'],
    requestedImageWidth: Props['imageWidth'],
  ) =>
  ({media}: Theme) => {
    const {aspectRatio, height: figureHeight} = figureProps
    const figureWidth = figureHeight * media.aspectRatio[aspectRatio ?? 'wide']
    const imageWidth = requestedImageWidth ?? figureWidth
    const imageHeight = imageWidth / imageAspectRatio
    const backgroundImageHeight = figureHeight * backgroundImageHeightFraction

    return StyleSheet.create({
      backgroundImage: {
        aspectRatio: media.illustrationAspectRatio.facades,
        position: 'absolute',
        height: backgroundImageHeight,
        alignSelf: 'center',
      },
      figure: {
        position: 'relative',
        marginTop: moveUp ? -moveUp : undefined,
        zIndex: moveUp ? -1 : undefined,
      },
      image: {
        position: 'absolute',
        bottom: 0,
        aspectRatio: imageAspectRatio,
        height: imageHeight,
        alignSelf: 'center',
      },
    })
  }
