import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {DeviceContext} from '../../../providers'
import {Text} from '../Text'

type Props = {
  isFocused: boolean
  navigation: BottomTabBarProps['navigation']
  options: BottomTabNavigationOptions
  route: BottomTabHeaderProps['route']
}

export const TabBarButton = ({
  isFocused,
  navigation,
  options,
  route,
}: Props) => {
  const device = useContext(DeviceContext)
  const horizontal = device.width > 600
  const label = options.tabBarLabel ?? options.title ?? route.name

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({
        name: route.name,
        merge: true,
        params: {},
      })
    }
  }

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    })
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.tabBarButton,
        horizontal && styles.tabBarButtonHorizontal,
      ]}>
      {options.tabBarIcon &&
        options.tabBarIcon({
          focused: isFocused,
          color: '',
          size: 0,
        })}
      <Text allowFontScaling={false} small>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabBarButtonHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
