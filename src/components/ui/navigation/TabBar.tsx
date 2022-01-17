import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {color} from '../../../tokens'
import {Text} from '../Text'
import hairlineWidth = StyleSheet.hairlineWidth

export const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  console.log('TabBar routes', state.routes)

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key]
        const label = options.tabBarLabel ?? options.title ?? route.name
        const isFocused = state.index === index

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

        // TODO Extract `TabBarButton` component
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={index} // TODO Find some other key – options.tabBarLabel seems fine but doesn’t work
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}>
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: '',
                size: 1,
              })}
            <Text allowFontScaling={false} small>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: hairlineWidth,
    borderTopColor: color.border.default,
    paddingBottom: 16,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
