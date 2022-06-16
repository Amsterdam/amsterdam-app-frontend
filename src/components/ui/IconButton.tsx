import React, {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet, View} from 'react-native'
import {Badge, BadgeProps} from '@/components/ui/Badge'
import {size as sizeTokens} from '@/tokens'

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

const hitSlopSize = sizeTokens.spacing.sm

export const IconButton = ({badgeValue, icon, ...props}: Props) => (
  <Pressable {...props}>
    {icon}
    {badgeValue ? (
      <View style={styles.badgePosition}>
        <Badge accessible={false} value={badgeValue} />
      </View>
    ) : null}
  </Pressable>
)

const styles = StyleSheet.create({
  badgePosition: {
    position: 'absolute',
    top: -hitSlopSize,
    right: -hitSlopSize,
    left: -hitSlopSize,
    alignItems: 'flex-end',
  },
})
