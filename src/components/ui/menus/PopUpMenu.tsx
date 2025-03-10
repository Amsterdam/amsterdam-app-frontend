import {StyleSheet, View} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {PopUpMenuItem} from '@/components/ui/menus/PopUpMenuItem'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
import {Duration} from '@/types/duration'

type Props = {
  isVisible: boolean
  menuItems: PopupMenuItem[]
  orientation: PopupMenuOrientation
  topInset: number
}

export const PopUpMenu = ({
  isVisible,
  menuItems,
  orientation,
  topInset,
}: Props) => {
  const theme = useTheme()
  const setAccessibilityFocus = useAccessibilityFocus(Duration.normal)
  const sheetStyles = createStyles(theme, orientation, topInset)

  return isVisible ? (
    <Animated.View
      entering={FadeIn.duration(theme.duration.transition.short)}
      exiting={FadeOut.duration(theme.duration.transition.short)}
      style={sheetStyles.container}>
      <View>
        {menuItems.map((item, index) => {
          const {color, label, onPress, testID} = item

          return (
            <PopUpMenuItem
              color={color}
              key={testID}
              label={label}
              onPress={onPress}
              ref={ref => index === 0 && setAccessibilityFocus(ref)}
              testID={testID}
            />
          )
        })}
      </View>
    </Animated.View>
  ) : null
}

const createStyles = (
  {color, z, size}: Theme,
  orientation: PopupMenuOrientation,
  topInset: number,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexShrink: 1,
      position: 'absolute',
      [orientation]: size.spacing.sm,
      top: topInset,
      backgroundColor: color.box.background.distinct,
      zIndex: z.tooltip,
      elevation: 2,
      shadowColor: color.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  })
