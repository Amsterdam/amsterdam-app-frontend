import {StyleSheet, View} from 'react-native'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
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
  const styles = useThemable(createStyles({width, index, carouselLength}))
  const setAccessibilityAutoFocus = useAccessibilityAutoFocus({
    isActive: isCurrentSlide,
  })

  const isLargeFontScale = fontScale >= 1.5
  const isMediumFontScale = fontScale >= 1.25
  const Wrapper = isPortrait && !isLargeFontScale ? View : ScrollView
  const ContentView = isMediumFontScale ? ScrollView : View

  return (
    <View
      ref={slideRef => !!slideRef && setAccessibilityAutoFocus(slideRef)}
      style={styles.content}>
      <AmsterdamAndWeespFacadesImage style={styles.backgroundImage} />
      <Track
        align={!isPortrait ? 'center' : 'start'}
        flex={1}
        gutter={!isPortrait ? 'lg' : 'no'}
        reverse={!isPortrait}>
        <Size
          height={isLargeFontScale || !isPortrait ? '100%' : '35%'}
          maxWidth={!isPortrait && !isLargeFontScale ? '50%' : '100%'}>
          <Column
            align={!isPortrait ? 'center' : 'start'}
            grow>
            <Box>
              <ContentView>
                <Wrapper>
                  <Title text={title} />
                  <Phrase variant="intro">{description}</Phrase>
                </Wrapper>
              </ContentView>
            </Box>
          </Column>
        </Size>
        {!isLargeFontScale && (
          <Column>
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
          </Column>
        )}
      </Track>
    </View>
  )
}

type StyleProps = {
  carouselLength: number
  index: number
  width: number
}

const createStyles =
  ({width, carouselLength, index}: StyleProps) =>
  ({size}: Theme) => {
    const backgroundImageOffset = carouselLength * width - index * width

    return StyleSheet.create({
      backgroundImage: {
        position: 'absolute',
        bottom: 0,
        zIndex: -10,
        paddingLeft: backgroundImageOffset,
      },
      content: {
        zIndex: 1000,
        width: width,
        paddingBottom: size.spacing.lg,
      },
    })
  }
