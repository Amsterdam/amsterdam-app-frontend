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

const homeRoutes: StackNavigationRoutes<HomeStackParams, 'authorizedProjects'> =
  {
    authorizedProjects: {
      name: 'AuthorizedProjects',
      options: {
        cardStyle: {
          backgroundColor: color.background.app,
        },
        headerTitle: () => <NonScalingHeaderTitle text="Je bouwprojecten" />,
      },
    },
  }

const menuRoutes: StackNavigationRoutes<MenuStackParams, 'writingGuide'> = {
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
  | 'notification'
  | 'projectDetail'
  | 'projectDetailBody'
  | 'projectNews'
  | 'projects'
  | 'projectWarning'
> = {
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
      headerTitle: () => <NonScalingHeaderTitle text="Werk in uitvoering" />,
    },
  },
  projectWarning: {
    name: 'ProjectWarning',
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
