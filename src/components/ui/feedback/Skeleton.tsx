import {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import Animated, {FadeOut} from 'react-native-reanimated'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useTheme} from '@/themes/useTheme'

type Props = {
  aspectRatio?: ImageAspectRatio
  children?: ReactElement
  isLoading: boolean
}

export const Skeleton = ({aspectRatio, children, isLoading}: Props) => {
  const theme = useTheme()
  const {skeleton} = theme.color
  const styles = createStyles(theme, aspectRatio)

  return (
    <View>
      {!!isLoading && (
        <Animated.View
          exiting={FadeOut}
          style={styles.wrapper}>
          <SkeletonPlaceholder
            backgroundColor={skeleton.background}
            highlightColor={skeleton.highlight}
            speed={1000}>
            <SkeletonPlaceholder.Item
              height="100%"
              width="100%"
            />
          </SkeletonPlaceholder>
        </Animated.View>
      )}
      {children}
    </View>
  )
}

const createStyles = (
  {color, media, z}: Theme,
  aspectRatio?: ImageAspectRatio,
) => {
  const aspectRatioValue = aspectRatio
    ? media.aspectRatio[aspectRatio]
    : undefined

  return StyleSheet.create({
    wrapper: {
      position: 'absolute',
      flex: 1,
      height: '100%',
      width: '100%',
      zIndex: z.skeleton,
    },
    noAnimation: {
      aspectRatio: aspectRatioValue,
      backgroundColor: color.skeleton.background,
      flex: 1,
    },
  })
}
