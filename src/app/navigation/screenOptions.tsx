import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '../../themes'
import {color, font, size} from '../../tokens'

type Options = {
  screenType: keyof Theme['color']['screen']['background']
}

const defaultOptions: Options = {
  screenType: 'default',
}

export const screenOptions: (
  theme: Theme,
  options?: Options,
) => StackNavigationOptions = (theme, options) => {
  const resolvedOptions = {...defaultOptions, ...options}
  return {
    cardStyle: {
      backgroundColor:
        theme.color.screen.background[resolvedOptions.screenType],
    },
    headerBackAccessibilityLabel: 'Terug',
    headerBackImage: () => (
      <View style={styles.headerBackImage}>
        <ChevronLeft width={20} height={20} fill={color.font.primary} />
      </View>
    ),
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor:
        theme.color.screen.background[resolvedOptions.screenType],
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
  }
}

const styles = StyleSheet.create({
  headerBackImage: {
    marginLeft: -size.spacing.md,
    paddingHorizontal: size.spacing.md + size.spacing.sm,
    paddingStart: size.spacing.md,
    paddingVertical: size.spacing.md - size.spacing.sm,
  },
})
