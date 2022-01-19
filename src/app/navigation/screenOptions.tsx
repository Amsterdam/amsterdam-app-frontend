import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../tokens'

export const stackScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.app,
  },
  headerBackAccessibilityLabel: 'Terug',
  headerBackImage: () => (
    <View style={styles.headerBackImage}>
      <ChevronLeft width={20} height={20} fill={color.font.regular} />
    </View>
  ),
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: color.background.white,
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerRightContainerStyle: {
    paddingEnd: size.spacing.md,
  },
  headerTitleAlign: 'center',
}

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  headerBackImage: {
    paddingEnd: 24,
    paddingStart: 16,
    paddingVertical: 12,
  },
})
