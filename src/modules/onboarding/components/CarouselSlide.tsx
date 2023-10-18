import {Dimensions, StyleSheet, View, ImageURISource} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  image: ImageURISource
  subText: string
  title: string
}

export const CarouselSlide = ({image, subText, title}: Props) => {
  const {isPortrait} = useDeviceContext()
  const {width} = Dimensions.get('window')
  const styles = useThemable(createStyles({width}))
  const Track = isPortrait ? Column : Row

  return (
    <View style={styles.slide}>
      <Track
        align={!isPortrait ? 'end' : 'start'}
        flex={1}
        grow
        reverse={!isPortrait}
        wrap={!isPortrait}>
        <Box>
          <Title text={title} />
          <Phrase variant="intro">{subText}</Phrase>
        </Box>
        <Column>
          <Center>
            <AspectRatio
              aspectRatio="extraWide"
              orientation="portrait">
              <Image
                resizeMode="contain"
                source={image}
                testID="WelcomeImage"
              />
            </AspectRatio>
          </Center>
        </Column>
      </Track>
    </View>
  )
}

type StyleProps = {
  width: number
}

const createStyles =
  ({width}: StyleProps) =>
  () =>
    StyleSheet.create({
      imageContainer: {
        flex: 1,
      },
      slide: {
        width,
        paddingBottom: sizeTokens.spacing.xl,
      },
    })
