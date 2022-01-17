import Housing from '@amsterdam/asc-assets/static/icons/Housing.svg'
import Menu from '@amsterdam/asc-assets/static/icons/Menu.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import Melden from '../../../assets/icons/melden.svg'
import {color} from '../../../tokens'

type Props = {
  focused: boolean
  name: 'action' | 'home' | 'menu'
}

export const TabBarIcon = ({focused, name}: Props) => {
  const iconConfig = {
    action: {
      component: Melden,
      inactiveColor: color.touchable.primary,
      marginTop: -24,
      paddingBottom: 0,
      size: 56,
    },
    home: {
      component: Housing,
      inactiveColor: color.font.regular,
      marginTop: 0,
      paddingBottom: 8,
      size: 24,
    },
    menu: {
      component: Menu,
      inactiveColor: color.font.regular,
      marginTop: 0,
      paddingBottom: 8,
      size: 24,
    },
  }

  const icon = iconConfig[name]
  const Icon = icon.component
  const foregroundColour = focused
    ? color.touchable.secondary
    : icon.inactiveColor

  const dynamicStyles = StyleSheet.create({
    icon: {
      fill: foregroundColour,
      width: icon.size,
      marginTop: icon.marginTop,
    },
    tabBarIcon: {
      paddingBottom: icon.paddingBottom,
    },
  })

  console.log('TabBarIcon', name)

  return (
    <View style={[styles.tabBarIcon, dynamicStyles.tabBarIcon]}>
      <Icon style={[styles.icon, dynamicStyles.icon]} />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    aspectRatio: 1,
  },
  tabBarIcon: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
})
