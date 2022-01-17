import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {DeviceContext} from '../../../providers'
import {color} from '../../../tokens'
import {Text} from '../Text'
import {Gutter} from '../layout'

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

  const dynamicStyles = StyleSheet.create({
    focus: {
      borderTopColor:
        options.tabBarLabel === 'Melden'
          ? 'transparent'
          : color.touchable.secondary,
    },
  })

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarButton}>
      <View
        style={[
          styles.container,
          isFocused && dynamicStyles.focus,
          horizontal && styles.horizontal,
        ]}>
        {options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: '',
            size: 0,
          })}
        {horizontal && <Gutter width="sm" />}
        <Text allowFontScaling={false} small>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },
  horizontal: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
  },
})
