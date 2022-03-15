import React from 'react'
import {NonScalingHeaderTitle} from '../../components/ui'
import {TabBarIcon} from '../../components/ui/navigation'
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
      tabBarIcon: props => <TabBarIcon {...props} name="action" />,
      tabBarLabel: 'Melden',
    },
  },
  home: {
    name: 'HomeTab',
    options: {
      tabBarIcon: props => <TabBarIcon {...props} name="home" />,
      tabBarLabel: 'Home',
    },
  },
  menu: {
    name: 'MenuTab',
    options: {
      headerShown: false,
      tabBarIcon: props => <TabBarIcon {...props} name="menu" />,
      tabBarLabel: 'Menu',
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
  addressInfo: {
    name: 'AddressInfo',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerShown: false,
      presentation: 'modal',
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
  authorizedProjects: {
    name: 'AuthorizedProjects',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Je bouwprojecten" />,
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
  projects: {
    name: 'Projects',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Bouwprojecten" />,
    },
  },
  projectsForDistrict: {
    name: 'ProjectsForDistrict',
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
  writingGuide: {
    name: 'WritingGuide',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerShown: false,
      presentation: 'modal',
    },
  },
}
