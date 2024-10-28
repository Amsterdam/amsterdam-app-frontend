import {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import {Row} from '@/components/ui/layout/Row'
import {useTheme} from '@/themes/useTheme'

const DEFAULT_DOT_ACTIVE_SIZE = 10
const DEFAULT_DOT_INACTIVE_SIZE = 8
const DOT_BORDER_RADIUS = 8

type DotProps = {
  activeSize: number
  inactiveSize: number
  index: number
  sharedValue: SharedValue<number>
}

const Dot = ({activeSize, inactiveSize, index, sharedValue}: DotProps) => {
  const {color} = useTheme()
  const sheetStyles = createStyles(activeSize, inactiveSize)

  const animatedStyles = useAnimatedStyle(() => {
    const isActive = index === Math.floor(sharedValue.value)

    return {
      backgroundColor: isActive
        ? color.chat.loading.active
        : color.chat.loading.inactive,
      height: withTiming(isActive ? activeSize : inactiveSize),
      width: withTiming(isActive ? activeSize : inactiveSize),
    }
  }, [index, sharedValue])

  return (
    <View style={sheetStyles.loadingDot}>
      <Animated.View style={[sheetStyles.loadingDotInner, animatedStyles]} />
    </View>
  )
}

type Props = {
  dotActiveSize?: number
  dotInactiveSize?: number
}

export const LoadingDots = ({
  dotActiveSize = DEFAULT_DOT_ACTIVE_SIZE,
  dotInactiveSize = DEFAULT_DOT_INACTIVE_SIZE,
}: Props) => {
  const sv = useSharedValue(0)

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(4, {duration: 1000, easing: Easing.bezier(0.5, 0.5, 0.5, 1)}),
      -1,
    )
  }, [sv])

  return (
    <Row
      align="center"
      gutter="xs"
      valign="center">
      {Array.from({length: 3}).map((_dot, index) => (
        <Dot
          activeSize={dotActiveSize}
          inactiveSize={dotInactiveSize}
          index={index}
          key={index}
          sharedValue={sv}
        />
      ))}
    </Row>
  )
}

const createStyles = (activeDotSize: number, inactiveDotSize: number) =>
  StyleSheet.create({
    loadingDot: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal:
        inactiveDotSize / 4 - (activeDotSize - inactiveDotSize) / 2,
      borderRadius: DOT_BORDER_RADIUS,
      height: activeDotSize,
      width: activeDotSize,
    },
    loadingDotInner: {
      borderRadius: DOT_BORDER_RADIUS,
    },
  })
