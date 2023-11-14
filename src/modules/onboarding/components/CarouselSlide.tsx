import {Dimensions, StyleSheet, View} from 'react-native'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import {Box} from '@/components/ui/containers/Box'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {CarouselSlideItemType} from '@/modules/onboarding/types'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  index: number
  item: CarouselSlideItemType
  length: number
}

export const CarouselSlide = ({item, length, index}: Props) => {
  const {isPortrait} = useDeviceContext()
  const {width} = Dimensions.get('window')
  const {image, subText, title} = item
  const styles = useThemable(createStyles({width, index, length}))
  const Track = isPortrait ? Column : Row

  return (
    <>
      <AmsterdamAndWeespFacadesImage style={styles.backgroundImage} />
      <View style={styles.content}>
        <Track
          align={!isPortrait ? 'center' : 'start'}
          flex={1}
          grow
          gutter={!isPortrait ? 'xl' : 'no'}
          reverse={!isPortrait}
          valign="center"
          wrap={!isPortrait}>
          <Size maxWidth={!isPortrait ? '50%' : '100%'}>
            <Box>
              <Title text={title} />
              <Phrase variant="intro">{subText}</Phrase>
            </Box>
          </Size>
          <Column>
            <Center>
              <AspectRatio
                aspectRatio="narrow"
                orientation="portrait">
                <Image
                  accessible={false}
                  resizeMode="contain"
                  source={image}
                  testID="WelcomeImage"
                />
              </AspectRatio>
            </Center>
          </Column>
        </Track>
      </View>
    </>
  )
}

type StyleProps = {
  index: number
  length: number
  width: number
}

const createStyles =
  ({width, length, index}: StyleProps) =>
  () => {
    const backgroundImageOffset = length * width - index * width

    return StyleSheet.create({
      backgroundImage: {
        position: 'absolute',
        zIndex: -10,
        paddingLeft: backgroundImageOffset,
      },
      content: {
        zIndex: 1000,
        width,
        paddingBottom: sizeTokens.spacing.xl,
      },
    })
  }
