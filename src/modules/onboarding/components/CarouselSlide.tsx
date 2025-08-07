import {useMemo, useState} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {AmsterdamHuisjesBackground} from '@/assets/images/AmsterdamHuisjesBackground'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Size} from '@/components/ui/layout/Size'
import {Track} from '@/components/ui/layout/Track'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityAutoFocus} from '@/hooks/accessibility/useAccessibilityAutoFocus'
import {CarouselSlideItem} from '@/modules/onboarding/types'
import {Theme} from '@/themes/themes'
import {sizeTokens} from '@/themes/tokens/size'
import {textTokens} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

const MIN_IMAGE_HEiGHT = 200
const MAX_LINES_PARAGRAPH = 3

type Props = {
  fontScale: number
  index: number
  isCurrentSlide: boolean
  isPortrait: boolean
  item: CarouselSlideItem
  windowWidth: number
}

export const CarouselSlide = ({
  item: {image, description, title},
  isCurrentSlide,
  index,
  windowWidth,
  isPortrait,
  fontScale,
}: Props) => {
  const [imageHeight, setImageHeight] = useState<number | undefined>()
  const {left: leftInset, right: rightInset} = useSafeAreaInsets()
  const isImageVisible = isPortrait
    ? imageHeight && imageHeight > MIN_IMAGE_HEiGHT
    : true
  const width =
    Platform.OS === 'android' && Platform.Version < 35
      ? windowWidth + leftInset + rightInset
      : windowWidth
  const styles = useThemable(createStyles({width, isImageVisible, isPortrait}))
  const accessibilityAutoFocusRef = useAccessibilityAutoFocus<Text>({
    isActive: isCurrentSlide,
  })
  const isLargeFontScale = fontScale >= 1.5
  const isMediumFontScale = fontScale >= 1.25
  const Wrapper = isPortrait && !isLargeFontScale ? View : ScrollView
  const ContentView = isMediumFontScale ? ScrollView : View

  // Prevents image from scaling on different text sizes.
  const minHeightTextContainer = useMemo(
    () =>
      isPortrait
        ? (textTokens.lineHeight.h1 +
            MAX_LINES_PARAGRAPH * textTokens.lineHeight.intro) *
            fontScale +
          sizeTokens.spacing.md
        : undefined,
    [fontScale, isPortrait],
  )

  return (
    <View style={styles.content}>
      <View style={styles.backgroundImageContainer}>
        <AmsterdamHuisjesBackground
          index={index}
          width={width}
        />
      </View>
      <HorizontalSafeArea flex={1}>
        <Track
          align={isPortrait ? 'start' : 'center'}
          alwaysDisplayAsRowForScreenReader
          flex={1}
          gutter={isPortrait ? 'no' : 'lg'}
          reverse={!isPortrait}>
          <Column
            align={isPortrait ? 'start' : 'center'}
            basis={isPortrait ? undefined : 1}
            grow={isPortrait ? undefined : 1}>
            <Size
              minHeight={minHeightTextContainer}
              valign="start">
              <Box
                insetHorizontal="md"
                insetTop="md">
                <ContentView>
                  <Wrapper>
                    <Title
                      ref={accessibilityAutoFocusRef}
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
            </Size>
          </Column>
          <Column
            basis={!isPortrait ? 1 : undefined}
            grow={1}>
            <View
              onLayout={e => setImageHeight(e.nativeEvent.layout.height)}
              style={styles.imageVisibility}>
              <Center grow>
                <Image
                  accessible={false}
                  resizeMode="contain"
                  source={image}
                  testID={`OnboardingSide${index}`}
                />
              </Center>
            </View>
          </Column>
        </Track>
      </HorizontalSafeArea>
      <Gutter height="md" />
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
        flexGrow: 1,
        opacity: isImageVisible ? 1 : 0,
      },
      backgroundImageContainer: {
        position: 'absolute',
        bottom: '30%',
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
