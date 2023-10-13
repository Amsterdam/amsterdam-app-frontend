import {Dimensions, StyleSheet, View, ImageURISource} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Center} from '@/components/ui/layout/Center'
import {Track} from '@/components/ui/layout/Track'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  image: ImageURISource
  subText: string
  title: string
}

export const CarouselSlide = ({image, subText, title}: Props) => {
  const {width} = Dimensions.get('window')
  const styles = useThemable(createStyles({width}))

  return (
    <View style={styles.slide}>
      <Box grow>
        <Title text={title} />
        <Phrase variant="intro">{subText}</Phrase>
        <Track flex={1}>
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
        </Track>
      </Box>
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
