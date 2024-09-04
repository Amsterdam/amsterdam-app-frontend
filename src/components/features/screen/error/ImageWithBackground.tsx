import {ComponentType} from 'react'
import {View} from 'react-native'
import {SvgProps} from 'react-native-svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {createStyles} from '@/components/features/screen/error/styles'
import {FullScreenErrorProps} from '@/components/features/screen/error/types'
import {Box} from '@/components/ui/containers/Box'
import {HideOnSmallSize} from '@/components/ui/layout/HideOnSmallSize'

const MIN_IMAGE_HEIGHT = 100

type ImageWithBackgroundProps = {
  Image: ComponentType<SvgProps>
  isPortrait: boolean
  styles: ReturnType<ReturnType<typeof createStyles>>
  testID: string
  withFacadesBackground: FullScreenErrorProps['withFacadesBackground']
}

export const ImageWithBackground = ({
  Image,
  styles,
  testID,
  withFacadesBackground,
  isPortrait,
}: ImageWithBackgroundProps) => (
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
              width="100%"
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
