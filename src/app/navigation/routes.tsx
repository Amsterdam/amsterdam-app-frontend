import React from 'react'
import {NonScalingHeaderTitle} from '../../components/ui'
import {TabBarIcon} from '../../components/ui/navigation'
import {wasteGuideRoutes} from '../../modules/waste-guide/routes'
import {color} from '../../tokens'
import {
  HomeStackParams,
  MenuStackParams,
  SharedStackParams,
  StackNavigationRoutes,
  TabNavigationRoutes,
  TabParams,
} from './types'

export const tabs: TabNavigationRoutes<TabParams> = {
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

const homeRoutes: StackNavigationRoutes<
  HomeStackParams,
  'authorizedProjects' | 'modules' | 'selectModules'
> = {
  authorizedProjects: {
    name: 'AuthorizedProjects',
    options: {
      cardStyle: {
        backgroundColor: color.background.app,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Je bouwprojecten" />,
    },
  },
  modules: {
    name: 'Modules',
    options: {
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: 'Modules ✨',
    },
  },
  selectModules: {
    name: 'SelectModules',
    options: {
      headerTitle: 'Instellingen',
    },
  },
}

const menuRoutes: StackNavigationRoutes<
  MenuStackParams,
  'contact' | 'menu' | 'writingGuide'
> = {
  contact: {
    name: 'Contact',
    options: {
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

const sharedRoutes: StackNavigationRoutes<
  SharedStackParams,
  | 'addressInfo'
  | 'addressForm'
  | 'notification'
  | 'notificationOverview'
  | 'projectDetail'
  | 'projectDetailBody'
  | 'projectManager'
  | 'projectNews'
  | 'projects'
  | 'projectWarning'
  | 'settings'
  | 'wasteGuide'
  | 'wasteMenu'
  | 'webView'
  | 'whereToPutBulkyWaste'
> = {
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
      cardStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Bouwprojecten" />,
    },
  },
  projectWarning: {
    name: 'ProjectWarning',
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

export const routes: typeof homeRoutes &
  typeof menuRoutes &
  typeof sharedRoutes &
  typeof wasteGuideRoutes = {
  ...homeRoutes,
  ...menuRoutes,
  ...sharedRoutes,
  ...wasteGuideRoutes,
}
