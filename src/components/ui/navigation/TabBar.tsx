import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color} from '../../../tokens'
import {TabBarButton} from './TabBarButton'
import hairlineWidth = StyleSheet.hairlineWidth

export const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => (
  <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const {options} = descriptors[route.key]

      return (
        <TabBarButton
          isFocused={state.index === index}
          key={index}
          navigation={navigation}
          options={options}
          route={route}
        />
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: hairlineWidth,
    borderTopColor: color.border.default,
    paddingBottom: 16,
  },
})
