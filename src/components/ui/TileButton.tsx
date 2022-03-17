import React, {ReactNode} from 'react'
import {FlexStyle, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Title} from './'
import {color, size} from '../../tokens'
import {Gutter} from './layout'

export type TileButtonProps = {
  icon?: ReactNode
  iconSize?: number
  label: string
  onPress: () => void
  square?: boolean
  width?: FlexStyle['flexBasis']
}

export const TileButton = ({
  icon,
  iconSize = 32,
  label,
  onPress,
  square,
  width,
}: TileButtonProps) => {
  const iconStyles = {width: iconSize, height: iconSize}

  return (
    <TouchableOpacity
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.tileButton,
        square ? styles.square : styles.notSquare,
        {flexBasis: width},
      ]}>
      <View style={iconStyles}>{icon}</View>
      <Gutter {...{[square ? 'height' : 'width']: 'md'}} />
      <Title center={square} level={4} text={label} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: color.background.grey,
    padding: size.spacing.md,
  },
})
