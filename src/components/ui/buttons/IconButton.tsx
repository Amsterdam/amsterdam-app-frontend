import React, {ReactElement} from 'react'
import {
  Pressable,
  PressableProps as PressableRNProps,
  StyleSheet,
  View,
} from 'react-native'
import {config} from '@/components/ui/config'
import {Badge, BadgeProps} from '@/components/ui/feedback'
import {Row} from '@/components/ui/layout'
import {IconProps} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

type Props = {
  /**
   * The value for a badge to be displayed on top of the icon.
   */
  badgeValue?: BadgeProps['value']
  /**
   * The icon component to use for the button.
   */
  icon: ReactElement<IconProps>
} & Omit<PressableRNProps, 'style'>

export const IconButton = ({badgeValue, icon, ...props}: Props) => {
  const styles = useThemable(createStyles)
  const hitSlop = (config.minTouchSize - (icon.props.size ?? 16)) / 2

  return (
    <Row align="start" valign="center">
      <Pressable accessibilityRole="button" hitSlop={hitSlop} {...props}>
        {icon}
        {badgeValue ? (
          <View style={styles.badgePosition}>
            <Badge value={badgeValue} variant="on-icon" />
          </View>
        ) : null}
      </Pressable>
    </Row>
  )
}

const createStyles = ({size}: Theme) => {
  const hitSlopSize = size.spacing.sm

  return StyleSheet.create({
    badgePosition: {
      position: 'absolute',
      top: -hitSlopSize,
      right: -hitSlopSize,
      left: -hitSlopSize,
      alignItems: 'flex-end',
    },
  })
}
