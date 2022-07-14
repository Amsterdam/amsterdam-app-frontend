import React, {ReactNode} from 'react'
import {FlexStyle, StyleSheet, View} from 'react-native'
import {Title} from '@/components/ui'
import {Pressable} from '@/components/ui/buttons'
import {Gutter} from '@/components/ui/layout'
import {IconSizes} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

export type TileButtonProps = {
  icon?: ReactNode
  iconSize?: IconSizes
  label: string
  onPress: () => void
  square?: boolean
  width?: FlexStyle['flexBasis']
}

/**
 * @deprecated
 */
export const TileButton = ({
  icon,
  iconSize = 32,
  label,
  onPress,
  square,
  width,
}: TileButtonProps) => {
  const styles = useThemable(createStyles)
  const iconStyles = {width: iconSize, aspectRatio: 1}

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}>
      <View
        style={[
          styles.tileButton,
          square ? styles.square : styles.notSquare,
          {flexBasis: width},
        ]}>
        <View style={iconStyles}>{icon}</View>
        <Gutter {...{[square ? 'height' : 'width']: 'md'}} />
        <Title center={square} level={4} text={label} />
      </View>
    </Pressable>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    square: {
      aspectRatio: 1,
      justifyContent: 'center',
    },
    notSquare: {
      flexDirection: 'row',
    },
    tileButton: {
      flexShrink: 1,
      alignItems: 'center',
      backgroundColor: color.box.background.grey,
      padding: size.spacing.md,
    },
  })
