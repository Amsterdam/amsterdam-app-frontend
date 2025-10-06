import {type BottomSheetBackgroundProps} from '@gorhom/bottom-sheet'
import {View, StyleSheet} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const BackgroundComponent = ({
  style,
  ...props
}: BottomSheetBackgroundProps) => {
  const styles = useThemable(createStylesBackgroundComponent)

  return (
    <View
      {...props}
      accessible={false}
      style={[styles.container, style]}
    />
  )
}

const createStylesBackgroundComponent = ({color, border}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.bottomSheet.background,
      borderRadius: border.radius.lg,
    },
  })
