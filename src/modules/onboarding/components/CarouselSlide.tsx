import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import AmsterdamHuisjesBackground from '@/assets/images/amsterdam-huisjes-background.svg'
import {Box} from '@/components/ui/containers/Box'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Size} from '@/components/ui/layout/Size'
import {Track} from '@/components/ui/layout/Track'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityAutoFocus} from '@/hooks/accessibility/useAccessibilityAutoFocus'
import {CarouselSlideItem} from '@/modules/onboarding/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const MIN_IMAGE_HEiGHT = 350

type Props = {
  carouselLength: number
  fontScale: number
  index: number
  isCurrentSlide: boolean
  isPortrait: boolean
  item: CarouselSlideItem
  width: number
}

export const CarouselSlide = ({
  item: {image, description, title},
  carouselLength,
  isCurrentSlide,
  index,
  width,
  isPortrait,
  fontScale,
}: Props) => {
  const [imageHeight, setImageHeight] = useState<number | undefined>()
  const isImageVisible = isPortrait
    ? imageHeight && imageHeight > MIN_IMAGE_HEiGHT
    : true
  const styles = useThemable(
    createStyles({width, index, carouselLength, isImageVisible, isPortrait}),
  )
  const setAccessibilityAutoFocus = useAccessibilityAutoFocus<View>({
    isActive: isCurrentSlide,
  })
  const isLargeFontScale = fontScale >= 1.5
  const isMediumFontScale = fontScale >= 1.25
  const Wrapper = isPortrait && !isLargeFontScale ? View : ScrollView
  const ContentView = isMediumFontScale ? ScrollView : View

  return (
    <View style={styles.content}>
      <View style={styles.backgroundImageContainer}>
        <AmsterdamHuisjesBackground />
      </View>
      <Track
        align={isPortrait ? 'start' : 'center'}
        flex={1}
        gutter={isPortrait ? 'no' : 'lg'}
        reverse={!isPortrait}>
        <Size
          maxWidth={isPortrait ? '100%' : '50%'}
          minHeight={isLargeFontScale || !isPortrait ? '100%' : '25%'}>
          <Column
            align={isPortrait ? 'start' : 'center'}
            grow>
            <Box>
              <ContentView>
                <Wrapper>
                  <View
                    accessible={true}
                    ref={setAccessibilityAutoFocus}>
                    <Title text={title} />
                    <Phrase variant="intro">{description}</Phrase>
                  </View>
                </Wrapper>
              </ContentView>
            </Box>
          </Column>
        </Size>
        <Column>
          <View
            onLayout={e => setImageHeight(e.nativeEvent.layout.height)}
            style={styles.imageVisibility}>
            <Center grow>
              <AspectRatio
                aspectRatio="narrow"
                orientation="portrait">
                <Image
                  accessible={false}
                  resizeMode="contain"
                  source={image}
                  testID={`OnboardingSide${index}`}
                />
              </AspectRatio>
            </Center>
          </View>
        </Column>
      </Track>
    </View>
  )
}

type StyleProps = {
  carouselLength: number
  index: number
  isImageVisible: number | boolean | undefined
  isPortrait: boolean
  width: number
}

const createStyles =
  ({width, carouselLength, index, isImageVisible, isPortrait}: StyleProps) =>
  ({size}: Theme) => {
    const backgroundWidth = carouselLength * width

    return StyleSheet.create({
      imageVisibility: {
        opacity: isImageVisible ? 1 : 0,
        paddingVertical: isPortrait ? size.spacing.lg : size.spacing.no,
      },
      backgroundImageContainer: {
        position: 'absolute',
        bottom: isPortrait ? 0 : undefined,
        height: isPortrait ? '50%' : '100%',
        width: backgroundWidth,
        transform: [
          {
            translateX: -(index * width),
          },
          {
            translateY: -25,
          },
        ],
        zIndex: -10,
      },
      content: {
        zIndex: 1000,
        width,
        paddingBottom: isPortrait ? size.spacing.lg : size.spacing.sm,
        overflow: 'hidden',
        position: 'relative',
      },
    })
  }