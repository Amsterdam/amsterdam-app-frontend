import {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {AmsterdamHuisjesBackground} from '@/assets/images/AmsterdamHuisjesBackground'
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
  fontScale: number
  index: number
  isCurrentSlide: boolean
  isPortrait: boolean
  item: CarouselSlideItem
  width: number
}

export const CarouselSlide = ({
  item: {image, description, title},
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
  const styles = useThemable(createStyles({width, isImageVisible, isPortrait}))
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
        <AmsterdamHuisjesBackground
          index={index}
          width={width}
        />
      </View>
      <Track
        align={isPortrait ? 'start' : 'center'}
        alwaysDisplayAsRowForScreenReader
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
                  <Title
                    ref={setAccessibilityAutoFocus}
                    text={title}
                  />
                  <Phrase
                    testID="OnboardingIntroPhrase"
                    variant="intro">
                    {description}
                  </Phrase>
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
  isImageVisible: number | boolean | undefined
  isPortrait: boolean
  width: number
}

const createStyles =
  ({width, isImageVisible, isPortrait}: StyleProps) =>
  ({size, z}: Theme) =>
    StyleSheet.create({
      imageVisibility: {
        opacity: isImageVisible ? 1 : 0,
        paddingVertical: isPortrait ? size.spacing.lg : size.spacing.no,
      },
      backgroundImageContainer: {
        position: 'absolute',
        bottom: '15%',
        height: isPortrait ? '50%' : '100%',
        zIndex: z.carouselSlideBackgroundImageContainer,
      },
      content: {
        zIndex: z.carouselSlideContent,
        width,
        paddingBottom: isPortrait ? size.spacing.lg : size.spacing.sm,
        overflow: 'hidden',
        position: 'relative',
      },
    })
