import {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import Animated, {FadeOut} from 'react-native-reanimated'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

const ANIMATION_SPEED_MS = 1000

type Props = {
  children?: ReactElement
  isLoading: boolean
}

export const Skeleton = ({children, isLoading}: Props) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const theme = useTheme()
  const {skeleton} = theme.color
  const styles = createStyles(theme)
  const isSkeletonVisible = !isReduceMotionEnabled && isLoading

  return (
    <View>
      {!!isSkeletonVisible && (
        <Animated.View
          exiting={FadeOut}
          style={styles.wrapper}>
          <SkeletonPlaceholder
            backgroundColor={skeleton.background}
            highlightColor={skeleton.highlight}
            speed={ANIMATION_SPEED_MS}>
            <SkeletonPlaceholder.Item
              height="100%"
              width="100%"
            />
          </SkeletonPlaceholder>
        </Animated.View>
      )}
      <HideFromAccessibility hide={isSkeletonVisible}>
        {children}
      </HideFromAccessibility>
    </View>
  )
}

const createStyles = ({z}: Theme) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      flex: 1,
      height: '100%',
      width: '100%',
      zIndex: z.skeleton,
    },
  })
