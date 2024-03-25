import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Figure} from '@/components/ui/media/Figure'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio, mediaTokens} from '@/themes/tokens/media'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  aspectRatio?: ImageAspectRatio
  backgroundImageHeightFraction?: number
  children?: ReactNode
  height?: number
  horizontalInset?: keyof SpacingTokens
  imageAspectRatio?: number
  withWeesp?: boolean
} & TestProps

/** If we have a width and an aspect ratio, use those to determine height, otherwise use a fraction of the available height */
const getHeight = (deviceHeight: number, isLandscape: boolean) =>
  Math.round(deviceHeight / (isLandscape ? 3 : 4))

export const FigureWithFacadesBackground = ({
  aspectRatio,
  backgroundImageHeightFraction,
  children,
  height,
  imageAspectRatio = mediaTokens.aspectRatio.wide,
  horizontalInset,
  testID,
  withWeesp = false,
}: Props) => {
  const {left, right} = useSafeAreaInsets()
  const {height: availableHeight, isLandscape} = useDeviceContext()
  const figureHeight = height ?? getHeight(availableHeight, isLandscape)

  const styles = useThemable(
    createStyles({
      backgroundImageHeightFraction,
      height: figureHeight,
      imageAspectRatio,
      horizontalInset,
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
          <View style={styles.imageInner}>{children}</View>
        </View>
      </Figure>
    </View>
  )
}

type StyleProps = Pick<
  Props,
  'backgroundImageHeightFraction' | 'imageAspectRatio' | 'horizontalInset'
> & {
  height: number
  left: number
  right: number
}

const createStyles =
  ({
    backgroundImageHeightFraction = 3 / 4,
    height,
    imageAspectRatio = mediaTokens.aspectRatio.wide,
    horizontalInset = 'md',
    left,
    right,
  }: StyleProps) =>
  ({media, size}: Theme) =>
    StyleSheet.create({
      backgroundImage: {
        aspectRatio: media.illustrationAspectRatio.facades,
        position: 'absolute',
        height: height * backgroundImageHeightFraction,
        alignSelf: 'center',
      },
      figure: {
        position: 'relative',
        height,
      },
      imageInner: {
        aspectRatio: imageAspectRatio,
        alignSelf: 'center',
        maxHeight: height,
        maxWidth: '100%',
      },
      imageOuter: {
        paddingLeft: left + size.spacing[horizontalInset],
        paddingRight: right + size.spacing[horizontalInset],
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height,
      },
    })
