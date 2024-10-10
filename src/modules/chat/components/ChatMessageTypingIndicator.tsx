import {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {useTheme} from '@/themes/useTheme'

const DOT_ACTIVE_SIZE = 10
const DOT_INACTIVE_SIZE = 8
const DOT_BORDER_RADIUS = 8

type DotProps = {
  index: number
  sharedValue: SharedValue<number>
}

const Dot = ({index, sharedValue}: DotProps) => {
  const {color} = useTheme()
  const sheetStyles = createStyles()

  const animatedStyles = useAnimatedStyle(() => {
    const isActive = index === Math.floor(sharedValue.value)

    return {
      backgroundColor: isActive
        ? color.chat.loading.active
        : color.chat.loading.inactive,
      height: withTiming(isActive ? DOT_ACTIVE_SIZE : DOT_INACTIVE_SIZE),
      width: withTiming(isActive ? DOT_ACTIVE_SIZE : DOT_INACTIVE_SIZE),
    }
  }, [index, sharedValue])

  return (
    <View style={sheetStyles.loadingDot}>
      <Animated.View style={[sheetStyles.loadingDotInner, animatedStyles]} />
    </View>
  )
}

export const ChatMessageTypingIndicator = () => {
  const sv = useSharedValue(0)

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(4, {duration: 1000, easing: Easing.bezier(0.5, 0.5, 0.5, 1)}),
      -1,
    )
  }, [sv])

  return (
    <Box insetVertical="xs">
      <Row
        align="center"
        gutter="xs"
        valign="center">
        {Array.from({length: 3}).map((_dot, index) => (
          <Dot
            index={index}
            key={index}
            sharedValue={sv}
          />
        ))}
      </Row>
    </Box>
  )
}

const createStyles = () =>
  StyleSheet.create({
    loadingDot: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: DOT_BORDER_RADIUS,
      height: DOT_ACTIVE_SIZE,
      width: DOT_ACTIVE_SIZE,
    },
    loadingDotInner: {
      borderRadius: DOT_BORDER_RADIUS,
    },
  })
