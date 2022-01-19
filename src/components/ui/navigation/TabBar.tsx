import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../../tokens'
import {TabBarButton} from './TabBarButton'
import hairlineWidth = StyleSheet.hairlineWidth

export const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => (
  <View accessibilityRole="tablist" style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const {options} = descriptors[route.key]

      return (
        <TabBarButton
          isFocused={state.index === index}
          key={index}
          navigation={navigation}
          options={options}
          route={route}
          tabData={{index: index, length: state.routes.length}}
        />
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: color.background.white,
    borderTopWidth: hairlineWidth,
    borderTopColor: color.border.default,
    paddingBottom: size.spacing.md,
  },
})
