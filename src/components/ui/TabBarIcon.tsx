import Housing from '@amsterdam/asc-assets/static/icons/Housing.svg'
import Menu from '@amsterdam/asc-assets/static/icons/Menu.svg'
import Pointer from '@amsterdam/asc-assets/static/icons/Pointer.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color} from '../../tokens'

type Props = {
  focused: boolean
  name: 'home' | 'report' | 'menu'
}

export const TabBarIcon = ({focused, name}: Props) => {
  const iconConfig = {
    home: {component: Housing, inactiveColor: color.font.regular},
    report: {component: Pointer, inactiveColor: color.touchable.primary},
    menu: {component: Menu, inactiveColor: color.font.regular},
  }
  const Icon = iconConfig[name].component
  const foregroundColour = focused
    ? color.touchable.secondary
    : iconConfig[name].inactiveColor

  return (
    <View style={[styles.tabBarIcon, focused && styles.focused]}>
      <Icon fill={foregroundColour} style={styles.iconSize} />
    </View>
  )
}

const styles = StyleSheet.create({
  focused: {
    borderTopColor: color.touchable.secondary,
  },
  iconSize: {
    width: 24,
    height: 24,
  },
  tabBarIcon: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },
})
