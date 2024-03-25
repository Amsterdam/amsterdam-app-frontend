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
  horizontalInset?: keyof SpacingTokens
  imageAspectRatio?: number
  withWeesp?: boolean
} & SelectedFigureProps &
  TestProps

const getHeight = (deviceHeight: number, isLandscape: boolean) =>
  Math.round(deviceHeight / (isLandscape ? 2 : 4))

export const FigureWithFacadesBackground = ({
  aspectRatio = 'wide',
  backgroundImageHeightFraction,
  children,
  height,
  imageAspectRatio = mediaTokens.aspectRatio.wide,
  horizontalInset,
  testID,
  withWeesp = false,
}: Props) => {
  const {left, right} = useSafeAreaInsets()
  const {height: deviceHeight, isLandscape} = useDeviceContext()
  const figureHeight = height ?? getHeight(deviceHeight, isLandscape)

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
          <View style={styles.image}>{children}</View>
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
      image: {
        aspectRatio: imageAspectRatio,
        alignSelf: 'center',
        maxHeight: height,
        maxWidth: '100%',
      },
    })
