import {FC} from 'react'
import {useWindowDimensions, StyleSheet, View} from 'react-native'
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
import {useAccessibilityAutoFocus} from '@/hooks/accessibility/useAccessibilityAutoFocus'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {CarouselSlideItemType} from '@/modules/onboarding/types'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  carouselLength: number
  index: number
  isCurrentSlide: boolean
  item: CarouselSlideItemType
}

export const CarouselSlide: FC<Props> = ({
  item,
  carouselLength,
  isCurrentSlide,
  index,
}) => {
  const {isPortrait, fontScale} = useDeviceContext()
  const {width} = useWindowDimensions()
  const {image, subText, title} = item
  const styles = useThemable(createStyles({width, index, carouselLength}))
  const setAccessibilityAutoFocus = useAccessibilityAutoFocus({
    isActive: isCurrentSlide,
  })

  const isImageVisible = fontScale <= 1.5
  const Track = isPortrait ? Column : Row

  return (
    <View
      ref={slideRef => setAccessibilityAutoFocus(slideRef as View)}
      style={styles.content}>
      <AmsterdamAndWeespFacadesImage style={styles.backgroundImage} />
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
        {!!isImageVisible && (
          <Column>
            <Center>
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
  () => {
    const backgroundImageOffset = carouselLength * width - index * width

    return StyleSheet.create({
      backgroundImage: {
        position: 'absolute',
        zIndex: -10,
        paddingRight: backgroundImageOffset,
      },
      content: {
        zIndex: 1000,
        width,
        paddingBottom: sizeTokens.spacing.xl,
      },
    })
  }
