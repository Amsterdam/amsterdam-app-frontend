import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {IllustratioAspectRatio} from '@/themes/tokens/media'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  backgroundImageHeightFraction?: number
  children?: ReactNode
  height?: number
  horizontalInset?: keyof SpacingTokens
  illustrationAspectRatio?: IllustratioAspectRatio
  withWeesp?: boolean
} & TestProps

/** Get a sensible height as a fraction of the available height */
const getHeight = (deviceHeight: number, isLandscape: boolean) =>
  Math.round(deviceHeight / (isLandscape ? 3 : 4))

export const FigureWithFacadesBackground = ({
  backgroundImageHeightFraction,
  children,
  height,
  illustrationAspectRatio,
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
      illustrationAspectRatio,
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
      <View style={styles.backgroundImage}>
        <BackgroundImage />
      </View>
      <View style={styles.imageOuter}>
        <View style={styles.imageInner}>{children}</View>
      </View>
    </View>
  )
}

type StyleProps = Pick<
  Props,
  | 'backgroundImageHeightFraction'
  | 'illustrationAspectRatio'
  | 'horizontalInset'
> & {
  height: number
  left: number
  right: number
}

const createStyles =
  ({
    backgroundImageHeightFraction = 3 / 4,
    height,
    illustrationAspectRatio = 'landscape',
    horizontalInset = 'md',
    left,
    right,
  }: StyleProps) =>
  ({media, size}: Theme) => {
    const horizontalInsetSize = size.spacing[horizontalInset]

    return StyleSheet.create({
      backgroundImage: {
        alignSelf: 'center',
        aspectRatio: media.illustrationAspectRatio.facades,
        height: height * backgroundImageHeightFraction,
        position: 'absolute',
      },
      figure: {
        height,
        overflow: 'hidden',
        position: 'relative',
      },
      imageInner: {
        aspectRatio: media.illustrationAspectRatio[illustrationAspectRatio],
        height,
        maxWidth: '100%',
      },
      imageOuter: {
        alignItems: 'center',
        bottom: 0,
        height,
        left: left + horizontalInsetSize,
        position: 'absolute',
        right: right + horizontalInsetSize,
        top: 0,
      },
    })
  }
