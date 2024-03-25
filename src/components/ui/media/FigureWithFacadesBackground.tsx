import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Figure, FigureProps} from '@/components/ui/media/Figure'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {mediaTokens} from '@/themes/tokens/media'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type SelectedFigureProps = Pick<FigureProps, 'aspectRatio' | 'height'>

type Props = {
  backgroundImageHeightFraction?: number
  children?: ReactNode
  imageAspectRatio?: number
  imageWidth?: number
  inset?: keyof SpacingTokens
  /**
   * The number of pixels by which to move the figure up, sliding behind the content above it.
   * This is especially useful on landscape devices.
   */
  moveUp?: number
  withWeesp?: boolean
} & SelectedFigureProps &
  TestProps

const getHeight = (
  deviceHeight: number,
  isLandscape: boolean,
  imageWidth?: number,
  imageAspectRatio?: number,
) => {
  if (imageWidth && imageAspectRatio) {
    return imageWidth / imageAspectRatio
  }

  return Math.round(deviceHeight / (isLandscape ? 2 : 4))
}

export const FigureWithFacadesBackground = ({
  aspectRatio = 'wide',
  backgroundImageHeightFraction,
  children,
  height,
  imageAspectRatio = mediaTokens.aspectRatio.wide,
  imageWidth,
  inset,
  moveUp,
  testID,
  withWeesp = false,
}: Props) => {
  const {left, right} = useSafeAreaInsets()
  const {height: deviceHeight, isLandscape} = useDeviceContext()
  const figureHeight =
    height ?? getHeight(deviceHeight, isLandscape, imageWidth, imageAspectRatio)

  const styles = useThemable(
    createStyles({
      backgroundImageHeightFraction,
      figureHeight,
      imageAspectRatio,
      inset,
      moveUp,
      left,
      right,
    }),
  )

  const BackgroundImage = withWeesp
    ? AmsterdamAndWeespFacadesImage
    : AmsterdamFacadesImage

  return (
    <View
      style={styles.figure}
      testID={testID}>
      <Figure
        aspectRatio={aspectRatio}
        height={figureHeight}>
        <View style={styles.backgroundImage}>
          <BackgroundImage />
        </View>
        <View style={styles.imageOuter}>
          <View style={styles.image}>{children}</View>
        </View>
      </Figure>
    </View>
  )
}

type StyleProps = Pick<
  Props,
  'backgroundImageHeightFraction' | 'imageAspectRatio' | 'inset' | 'moveUp'
> & {
  figureHeight: number
  left: number
  right: number
}

const createStyles =
  ({
    backgroundImageHeightFraction = 3 / 4,
    figureHeight,
    imageAspectRatio = mediaTokens.aspectRatio.wide,
    inset = 'md',
    moveUp,
    left,
    right,
  }: StyleProps) =>
  ({media, size, z}: Theme) => {
    const backgroundImageHeight = figureHeight * backgroundImageHeightFraction
    const paddingLeft = left + size.spacing[inset]
    const paddingRight = right + size.spacing[inset]

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
        zIndex: moveUp ? z.figureWithFacadesBackgroundFigure : undefined,
        height: figureHeight,
      },
      imageOuter: {
        paddingLeft,
        paddingRight,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: figureHeight,
      },
      image: {
        aspectRatio: imageAspectRatio,
        alignSelf: 'center',
        maxHeight: figureHeight,
        maxWidth: '100%',
      },
    })
  }
