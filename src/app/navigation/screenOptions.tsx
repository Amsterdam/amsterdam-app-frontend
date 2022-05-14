import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '../../themes'
import {color, font, size} from '../../tokens'

type Overrides = {
  headerBackgroundColor: string
}

export const stackScreenOptions: (
  theme: Theme,
  overrides: Overrides,
) => StackNavigationOptions = (theme, overrides) => ({
  cardStyle: {
    backgroundColor: theme.color.screen.background.settings,
  },
  headerBackAccessibilityLabel: 'Terug',
  headerBackImage: () => (
    <View style={styles.headerBackImage}>
      <ChevronLeft width={20} height={20} fill={color.font.primary} />
    </View>
  ),
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: overrides?.headerBackgroundColor || color.background.white,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerLeftContainerStyle: {
    paddingStart: size.spacing.md,
  },
  headerRightContainerStyle: {
    paddingEnd: size.spacing.md,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: theme.color.text.default,
    fontFamily: font.weight.demi,
    fontSize: theme.text.fontSize.h1,
  },
})

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  headerBackImage: {
    marginLeft: -size.spacing.md,
    paddingHorizontal: size.spacing.md + size.spacing.sm,
    paddingStart: size.spacing.md,
    paddingVertical: size.spacing.md - size.spacing.sm,
  },
})
