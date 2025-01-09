import {ComponentType} from 'react'
import {StyleSheet, View} from 'react-native'
import {SvgProps} from 'react-native-svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Box} from '@/components/ui/containers/Box'
import {FullScreenErrorProps} from '@/components/ui/feedback/error/types'
import {HideOnSmallSize} from '@/components/ui/layout/HideOnSmallSize'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const MIN_IMAGE_HEIGHT = 200

type ImageWithBackgroundProps = {
  Image: ComponentType<SvgProps>
  backgroundPosition: FullScreenErrorProps['backgroundPosition']
  isImageFullSize: FullScreenErrorProps['isImageFullSize']
  isPortrait: boolean
  testID: string
  withFacadesBackground: FullScreenErrorProps['withFacadesBackground']
}

export const ImageWithBackground = ({
  backgroundPosition,
  isImageFullSize = true,
  Image,
  testID,
  withFacadesBackground,
  isPortrait,
}: ImageWithBackgroundProps) => {
  const styles = useThemable(
    createStyles({
      backgroundPosition,
      isImageFullSize,
      isPortrait,
    }),
  )

  return (
    <>
      {!!withFacadesBackground && (
        <View
          style={styles.figureBackground}
          testID={testID + 'BackgroundImage'}>
          <View style={styles.facade}>
            <AmsterdamFacadesImage />
          </View>
        </View>
      )}
      {isPortrait ? (
        <View style={styles.figureForeground}>
          <HideOnSmallSize
            minHeight={MIN_IMAGE_HEIGHT}
            testID={testID + 'Image'}>
            <Box inset="md">
              <Image
                height="100%"
                width={isImageFullSize ? '100%' : undefined}
              />
            </Box>
          </HideOnSmallSize>
        </View>
      ) : (
        <View
          style={styles.figureForeground}
          testID={testID + 'Image'}>
          <Image
            height="100%"
            width="100%"
          />
        </View>
      )}
    </>
  )
}

const createStyles =
  ({
    backgroundPosition = 'bottom',
    isPortrait,
    isImageFullSize,
  }: Partial<ImageWithBackgroundProps>) =>
  ({media, size}: Theme) =>
    StyleSheet.create({
      figureBackground: {
        position: 'absolute',
        bottom: backgroundPosition === 'center' && isPortrait ? '50%' : '20%',
        width: '100%',
        alignContent: 'flex-start',
        overflow: 'hidden',
      },
      figureForeground: {
        flexGrow: 1,
        alignSelf: !isImageFullSize && isPortrait ? 'center' : undefined,
        justifyContent: 'center',
        paddingBottom: isPortrait ? undefined : size.spacing.md,
      },
      facade: {
        aspectRatio: media.illustrationAspectRatio.facades,
        height: media.figureHeight.lg * (3 / 4),
        alignSelf: 'center',
      },
    })
