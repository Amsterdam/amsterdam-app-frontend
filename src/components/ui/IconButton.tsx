import React, {ReactNode} from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import {Badge, BadgeProps} from '@/components/ui/Badge'
import {Theme, useThemable} from '@/themes'

type Props = {
  /**
   * The value for a badge to be displayed on top of the icon.
   */
  badgeValue?: BadgeProps['value']
  /**
   * The icon to be used. Should be an SVG image wrapped in the `Icon` component.
   */
  icon: ReactNode
} & Omit<PressableProps, 'style'>

export const IconButton = ({badgeValue, icon, ...props}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable {...props}>
      {icon}
      {badgeValue ? (
        <View style={styles.badgePosition}>
          <Badge accessible={false} value={badgeValue} />
        </View>
      ) : null}
    </Pressable>
  )
}

const createStyles = ({size}: Theme) => {
  const hitSlopSize = size.spacing.sm

  const styles: ViewStyle = {
    position: 'absolute',
    top: -hitSlopSize,
    right: -hitSlopSize,
    left: -hitSlopSize,
    alignItems: 'flex-end',
  }

  return StyleSheet.create({badgePosition: styles})
}
