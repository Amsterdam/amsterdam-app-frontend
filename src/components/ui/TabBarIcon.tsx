import Housing from '@amsterdam/asc-assets/static/icons/Housing.svg'
import Menu from '@amsterdam/asc-assets/static/icons/Menu.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import Melden from '../../assets/icons/melden.svg'
import {color} from '../../tokens'

type Props = {
  focused: boolean
  name: 'home' | 'report' | 'menu'
}

export const TabBarIcon = ({focused, name}: Props) => {
  const iconConfig = {
    home: {
      component: Housing,
      inactiveColor: color.font.regular,
      marginTop: undefined,
      size: 24,
    },
    report: {
      component: Melden,
      inactiveColor: color.touchable.primary,
      marginTop: -16,
      size: 56,
    },
    menu: {
      component: Menu,
      inactiveColor: color.font.regular,
      marginTop: undefined,
      size: 24,
    },
  }

  const icon = iconConfig[name]
  const Icon = icon.component
  const foregroundColour = focused
    ? color.touchable.secondary
    : icon.inactiveColor

  const styles = StyleSheet.create({
    focused: {
      borderTopColor:
        name === 'report' ? 'transparent' : color.touchable.secondary,
    },
    icon: {
      fill: foregroundColour,
      width: icon.size,
      height: icon.size,
      marginTop: icon.marginTop,
    },
    tabBarIcon: {
      paddingHorizontal: 20,
      paddingVertical: 4,
      alignItems: 'center',
      borderTopWidth: 3,
      borderTopColor: 'transparent',
    },
  })

  return (
    <View style={[styles.tabBarIcon, focused && styles.focused]}>
      <Icon style={styles.icon} />
    </View>
  )
}
