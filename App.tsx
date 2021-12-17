import Housing from '@amsterdam/asc-assets/static/icons/Housing.svg'
import Menu from '@amsterdam/asc-assets/static/icons/Menu.svg'
import Pointer from '@amsterdam/asc-assets/static/icons/Pointer.svg'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import React, {useContext} from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {Logo} from './src/assets/icons'
import {NonScalingHeaderTitle} from './src/components/ui'
import {getEnvironment} from './src/environment'
import {linking} from './src/linking'
import {AddressContext} from './src/providers'
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
import {color} from './src/tokens'
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
  Settings: undefined
  Waste: undefined
  WasteMenu: undefined
  WebView: WebViewRouteParams
  WhereToPutBulkyWaste: undefined
}

type Routes = {
  [route: string]: {
    name: keyof RootStackParamList
    options?: NativeStackNavigationOptions
    title?: string
  }
}

export const routes: Routes = {
  addressForm: {
    name: 'AddressForm',
    options: {
      contentStyle: {
        backgroundColor: color.background.white,
      },
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Uw adres" />,
    },
  },
  contact: {
    name: 'Contact',
    options: {
      contentStyle: {
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
      contentStyle: {
        backgroundColor: color.background.white,
      },
      headerTitle: () => <NonScalingHeaderTitle text="Menu" />,
    },
  },
  notification: {
    name: 'Notification',
    options: {
      contentStyle: {
        backgroundColor: color.background.white,
      },
      presentation: 'modal',
      headerTitle: () => <NonScalingHeaderTitle text="Verstuur pushbericht" />,
    },
  },
  notificationOverview: {
    name: 'NotificationOverview',
    options: {
      contentStyle: {
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
      contentStyle: {
        backgroundColor: color.background.white,
      },
    },
  },
  projectManager: {
    name: 'ProjectManager',
    options: {
      contentStyle: {
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
      contentStyle: {
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
      contentStyle: {
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

const globalScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: color.background.white,
  },
  headerBackTitleVisible: false,
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
    settings,
    wasteGuide,
    wasteMenu,
    webView,
    whereToPutBulkyWaste,
  } = routes

  const addressContext = useContext(AddressContext)

  const HomeStack = createNativeStackNavigator()

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator initialRouteName={home.name}>
        <HomeStack.Screen
          component={HomeScreen}
          name="ActualHome"
          options={home.options}
        />
      </HomeStack.Navigator>
    )
  }

  const ReportStack = createNativeStackNavigator()

  function ReportStackScreen() {
    return (
      <ReportStack.Navigator
        initialRouteName={menu.name}
        screenOptions={globalScreenOptions}>
        <ReportStack.Screen
          component={WebViewScreen}
          name={webView.name}
          options={webView.options}
          initialParams={{
            title: 'Melden',
            url: `${getEnvironment().signalsBaseUrl}/incident/beschrijf`,
            urlParams: {
              lat: addressContext.address?.centroid[1],
              lng: addressContext.address?.centroid[0],
            },
          }}
        />
      </ReportStack.Navigator>
    )
  }

  const MenuStack = createNativeStackNavigator()

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
            }}>
            <Tab.Screen
              name="HomeTab"
              component={HomeStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabBarIcon}>
                    <Housing
                      fill={
                        focused
                          ? color.touchable.secondary
                          : color.touchable.primary
                      }
                    />
                  </View>
                ),
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="ReportTab"
              component={ReportStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabBarIcon}>
                    <Pointer
                      fill={
                        focused
                          ? color.touchable.secondary
                          : color.touchable.primary
                      }
                    />
                  </View>
                ),
                tabBarLabel: 'Melden',
              }}
            />
            <Tab.Screen
              name="MenuTab"
              component={MenuStackScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={styles.tabBarIcon}>
                    <Menu
                      fill={
                        focused
                          ? color.touchable.secondary
                          : color.touchable.primary
                      }
                    />
                  </View>
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

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
  },
})
