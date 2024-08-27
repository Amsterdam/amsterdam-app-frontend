import {View, StyleSheet} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = {
  aspectRatio?: ImageAspectRatio
}

export const Skeleton = ({aspectRatio}: Props) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const [backgroundColor, highlightColor] = useThemable(getColors)
  const styles = useThemable(createStyles(aspectRatio))

  if (isReduceMotionEnabled) {
    return <View style={styles.noAnimation} />
  }

  return (
    <SkeletonPlaceholder
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
      speed={1000}>
      <SkeletonPlaceholder.Item
        alignItems="stretch"
        height={'100%'}
        justifyContent="space-between"
        style={styles?.wrapper}>
        <SkeletonPlaceholder.Item
          height={'100%'}
          width={'100%'}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

const getColors = ({color}: Theme) => [
  color.skeleton.background,
  color.skeleton.highlight,
]

const createStyles =
  (aspectRatio?: ImageAspectRatio) =>
  ({color, media}: Theme) => {
    const aspectRatioValue = aspectRatio
      ? media.aspectRatio[aspectRatio]
      : undefined

    return StyleSheet.create({
      noAnimation: {
        aspectRatio: aspectRatioValue,
        backgroundColor: color.skeleton.background,
        flex: 1,
      },
      wrapper: {
        aspectRatio: aspectRatioValue,
        minHeight: 20,
      },
    })
  }
