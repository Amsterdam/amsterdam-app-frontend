import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {StackNavigationOptions} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {Logo} from '../../assets/icons'
import {NonScalingHeaderTitle, TabBarIcon} from '../../components/ui'
import {color, size} from '../../tokens'
import {
  HomeStackParamList,
  MenuStackParamList,
  ReportStackParamList,
  RootStackParamList,
  Routes,
  TabNavRoutes,
} from './types'

export const homeScreenOptions: Routes<HomeStackParamList> = {
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
}
export const tabNavOptions: TabNavRoutes<RootStackParamList> = {
  home: {
    name: 'HomeStack',
    options: {
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="home" />,
      tabBarLabel: 'Home',
    },
  },
  menu: {
    name: 'MenuStack',
    options: {
      headerShown: false,
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="menu" />,
      tabBarLabel: 'Menu',
    },
  },
  report: {
    name: 'ReportStack',
    options: {
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="report" />,
      tabBarLabel: 'Melden',
    },
  },
}

export const menuScreenOptions: Routes<MenuStackParamList> = {
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
  contact: {
    name: 'Contact',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Contact" />,
    },
  },
  menu: {
    name: 'Menu',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Menu" />,
    },
  },
  notification: {
    name: 'Notification',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Verstuur pushbericht" />,
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
  projectDetail: {
    name: 'ProjectDetail',
  },
  projectDetailBody: {
    name: 'ProjectDetailBody',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
    },
  },
  projectManager: {
    name: 'ProjectManager',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Welkom" />,
      presentation: 'modal',
    },
  },
  projectNews: {
    name: 'ProjectNews',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Nieuws" />,
      cardStyle: {
        backgroundColor: color.background.white,
      },
    },
  },
  projectOverview: {
    name: 'ProjectOverview',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Werkzaamheden" />,
    },
  },
  projectOverviewByDistrict: {
    name: 'ProjectOverviewByDistrict',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Werkzaamheden per stadsdeel" />
      ),
    },
  },
  projectWarning: {
    name: 'ProjectWarning',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Waarschuwing" />,
    },
  },
  settings: {
    name: 'Settings',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Instellingen" />,
    },
  },
  wasteGuide: {
    name: 'Waste',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Afvalinformatie op adres" />
      ),
    },
  },
  wasteMenu: {
    name: 'WasteMenu',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Menu" />,
    },
  },
  webView: {
    name: 'WebView',
  },
  whereToPutBulkyWaste: {
    name: 'WhereToPutBulkyWaste',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Grof afval" />,
    },
  },
}

export const reportScreenOptions: Routes<ReportStackParamList> = {
  reportIssue: {
    name: 'ReportIssue',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
    },
  },
}

export const stackScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.app,
  },
  headerStyle: {
    backgroundColor: color.background.white,
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerBackAccessibilityLabel: 'Terug',
  headerBackImage: () => (
    <ChevronLeft
      width={20}
      height={20}
      fill={color.font.regular}
      style={{margin: size.spacing.sm}}
    />
  ),
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
}

export const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: color.touchable.secondary,
  tabBarInactiveTintColor: color.touchable.primary,
  tabBarLabelStyle: {fontSize: 12, lineHeight: 16},
}
