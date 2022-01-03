import React from 'react'
import {View} from 'react-native'
import {Logo} from '../../../assets/icons'
import {NonScalingHeaderTitle} from '../../../components/ui'
import {color} from '../../../tokens'
import {HomeStackParams, StackNavigationRoutes} from '../types'

export const homeRoutes: StackNavigationRoutes<HomeStackParams> = {
  addressForm: {
    name: 'AddressForm',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Uw adres" />,
    },
  },
  bestWishes21: {
    name: 'BestWishes21',
    options: {
      cardStyle: {
        backgroundColor: color.touchable.secondary,
      },
      headerTitle: () => (
        <NonScalingHeaderTitle text="Terugblikken & vooruitkijken" />
      ),
    },
  },
  home: {
    name: 'Home',
    options: {
      headerTitle: () => (
        <View
          accessible
          accessibilityRole="header"
          accessibilityLabel="Gemeente Amsterdam">
          <Logo width={85} />
        </View>
      ),
    },
  },
}
