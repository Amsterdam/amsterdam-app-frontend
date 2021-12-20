import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {StatusBar, View} from 'react-native'
import {Logo} from './src/assets/icons'
import {NonScalingHeaderTitle, TabBarIcon} from './src/components/ui'
import {linking} from './src/linking'
import {RootProvider} from './src/providers/root.provider'
import {
  ContactScreen,
  HomeScreen,
  MenuScreen,
  NotificationOverviewScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  ProjectWarningScreen,
  SettingsScreen,
  WasteMenuScreen,
  WasteScreen,
  WebViewRouteParams,
  WebViewScreen,
  WhereToPutBulkyWasteScreen,
} from './src/screens'
import {
  CreateNotificationScreen,
  ProjectDetails,
} from './src/screens/create-notification'
import {AddressFormScreen} from './src/screens/modals/AddressFormScreen'
import {ReportIssueScreen} from './src/screens/report'
import {color, size} from './src/tokens'
import {ProjectDetailBody} from './src/types'

export type RootStackParamList = {
  AddressForm: undefined
  Contact: undefined
  Home: undefined
  Menu: undefined
  Notification: {projectDetails: ProjectDetails}
  NotificationOverview: undefined
  ProjectDetail: {id: string}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectManager: {id: string}
  ProjectNews: {id: string}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {id: number}
  ProjectWarning: {id: string}
  ReportIssue: {title: string}
  Settings: undefined
  Waste: undefined
  WasteMenu: undefined
  WebView: WebViewRouteParams
  WhereToPutBulkyWaste: undefined
}

type Routes = {
  [route: string]: {
    name: keyof RootStackParamList
    options?: StackNavigationOptions
    title?: string
  }
}

export const routes: Routes = {
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

const globalScreenOptions: StackNavigationOptions = {
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

export const App = () => {
  const {
    addressForm,
    contact,
    home,
    menu,
    notification,
    notificationOverview,
    projectDetail,
    projectDetailBody,
    projectManager,
    projectNews,
    projectOverview,
    projectOverviewByDistrict,
    projectWarning,
    reportIssue,
    settings,
    wasteGuide,
    wasteMenu,
    webView,
    whereToPutBulkyWaste,
  } = routes

  const HomeStack = createStackNavigator()

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator
        initialRouteName={home.name}
        screenOptions={globalScreenOptions}>
        <HomeStack.Screen
          component={HomeScreen}
          name="ActualHome"
          options={home.options}
        />
      </HomeStack.Navigator>
    )
  }

  const ReportStack = createStackNavigator()

  function ReportStackScreen() {
    return (
      <ReportStack.Navigator
        initialRouteName={menu.name}
        screenOptions={globalScreenOptions}>
        <ReportStack.Screen
          component={ReportIssueScreen}
          name={reportIssue.name}
          options={reportIssue.options}
        />
      </ReportStack.Navigator>
    )
  }

  const MenuStack = createStackNavigator()

  function MenuStackScreen() {
    return (
      <MenuStack.Navigator
        initialRouteName={menu.name}
        screenOptions={globalScreenOptions}>
        <MenuStack.Screen
          component={AddressFormScreen}
          name={addressForm.name}
          options={addressForm.options}
        />
        <MenuStack.Screen
          component={ContactScreen}
          name={contact.name}
          options={contact.options}
        />
        <MenuStack.Screen
          component={CreateNotificationScreen}
          name={notification.name}
          options={notification.options}
        />
        <MenuStack.Screen
          component={MenuScreen}
          name="Menu"
          options={menu.options}
        />
        <MenuStack.Screen
          component={NotificationOverviewScreen}
          name={notificationOverview.name}
          options={notificationOverview.options}
        />
        <MenuStack.Screen
          component={ProjectDetailScreen}
          name={projectDetail.name}
          options={projectDetail.options}
        />
        <MenuStack.Screen
          component={ProjectDetailBodyScreen}
          name={projectDetailBody.name}
          options={projectDetailBody.options}
        />
        <MenuStack.Screen
          component={ProjectManagerScreen}
          name={projectManager.name}
          options={projectManager.options}
        />
        <MenuStack.Screen
          component={ProjectNewsScreen}
          name={projectNews.name}
          options={projectNews.options}
        />
        <MenuStack.Screen
          component={ProjectOverviewByDistrictScreen}
          name={projectOverviewByDistrict.name}
          options={projectOverviewByDistrict.options}
        />
        <MenuStack.Screen
          component={ProjectOverviewScreen}
          name={projectOverview.name}
          options={projectOverview.options}
        />
        <MenuStack.Screen
          component={ProjectWarningScreen}
          name={projectWarning.name}
          options={projectWarning.options}
        />
        <MenuStack.Screen
          component={SettingsScreen}
          name={settings.name}
          options={settings.options}
        />
        <MenuStack.Screen
          component={WasteScreen}
          name={wasteGuide.name}
          options={wasteGuide.options}
        />
        <MenuStack.Screen
          component={WasteMenuScreen}
          name={wasteMenu.name}
          options={wasteMenu.options}
        />
        <ReportStack.Screen
          component={WebViewScreen}
          name={webView.name}
          options={webView.options}
        />
        <MenuStack.Screen
          component={WhereToPutBulkyWasteScreen}
          name={whereToPutBulkyWaste.name}
          options={whereToPutBulkyWaste.options}
        />
      </MenuStack.Navigator>
    )
  }

  const Tab = createBottomTabNavigator()

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <RootProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: color.touchable.secondary,
              tabBarInactiveTintColor: color.touchable.primary,
              tabBarLabelStyle: {fontSize: 12, lineHeight: 16},
            }}>
            <Tab.Screen
              name="HomeTab"
              component={HomeStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <TabBarIcon focused={focused} name="home" />
                ),
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="ReportTab"
              component={ReportStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <TabBarIcon focused={focused} name="report" />
                ),
                tabBarLabel: 'Melden',
              }}
            />
            <Tab.Screen
              name="MenuTab"
              component={MenuStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <TabBarIcon focused={focused} name="menu" />
                ),
                tabBarLabel: 'Menu',
              }}
            />
          </Tab.Navigator>
        </RootProvider>
      </NavigationContainer>
    </>
  )
}
