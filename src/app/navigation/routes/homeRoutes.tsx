import React from 'react'
import {HeaderLogo} from '../'
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
      headerLeft: () => <HeaderLogo />,
      headerTitle: '',
    },
  },
  notificationOverview: {
    name: 'NotificationOverview',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Berichten" />,
    },
  },
  projectOverview: {
    name: 'ProjectOverview',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Bouwprojecten" />,
    },
  },
  settings: {
    name: 'Settings',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
  wasteGuide: {
    name: 'WasteGuide',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Afvalinformatie op adres" />
      ),
    },
  },
}
