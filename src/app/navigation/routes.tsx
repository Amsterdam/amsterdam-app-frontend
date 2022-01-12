import React from 'react'
import {
  NonScalingHeaderTitle,
  NonScalingTabBarLabel,
  TabBarIcon,
} from '../../components/ui'
import {color} from '../../tokens'
import {HeaderLogo} from './HeaderLogo'
import {
  StackNavigationRoutes,
  StackParams,
  TabNavigationRoutes,
  TabParams,
} from './types'

export const tabs: TabNavigationRoutes<TabParams> = {
  action: {
    name: 'ActionTab',
    options: {
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="action" />,
      tabBarLabel: () => <NonScalingTabBarLabel text="Melden" />,
    },
  },
  home: {
    name: 'HomeTab',
    options: {
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="home" />,
      tabBarLabel: () => <NonScalingTabBarLabel text="Home" />,
    },
  },
  menu: {
    name: 'MenuTab',
    options: {
      headerShown: false,
      tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="menu" />,
      tabBarLabel: () => <NonScalingTabBarLabel text="Menu" />,
    },
  },
}

export const routes: StackNavigationRoutes<StackParams> = {
  admin: {
    name: 'Admin',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Admin ⚡️" />,
    },
  },
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
  contact: {
    name: 'Contact',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Contact" />,
    },
  },
  home: {
    name: 'Home',
    options: {
      headerLeft: () => <HeaderLogo />,
      headerTitle: '',
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
      cardStyle: {
        backgroundColor: color.background.white,
      },
    },
  },
  projectOverview: {
    name: 'ProjectOverview',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Bouwprojecten" />,
    },
  },
  projectOverviewByDistrict: {
    name: 'ProjectOverviewByDistrict',
    options: {
      headerTitle: () => (
        <NonScalingHeaderTitle text="Bouwprojecten per stadsdeel" />
      ),
    },
  },
  projectWarning: {
    name: 'ProjectWarning',
  },
  reportIssue: {
    name: 'ReportIssue',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Melden" />,
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
