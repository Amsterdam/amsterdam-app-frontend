import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {StatusBar, View} from 'react-native'
import {Logo} from './src/assets/icons'
import {NonScalingHeaderTitle} from './src/components/ui'
import {linking} from './src/linking'
import {RootProvider} from './src/providers/root.provider'
import {
  HomeScreen,
  NotificationOverviewScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectManagerScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  ProjectWarningScreen,
  SettingsScreen,
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
import {color, size} from './src/tokens'
import {ProjectDetailBody} from './src/types'

export type RootStackParamList = {
  AddressForm: undefined
  Home: undefined
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
  const Stack = createStackNavigator()
  const {
    addressForm,
    home,
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
    webView,
    whereToPutBulkyWaste,
  } = routes

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <RootProvider>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen
              component={HomeScreen}
              name={home.name}
              options={home.options}
            />
            <Stack.Screen
              component={ProjectManagerScreen}
              name={projectManager.name}
              options={projectManager.options}
            />
            <Stack.Screen
              component={AddressFormScreen}
              name={addressForm.name}
              options={addressForm.options}
            />
            <Stack.Screen
              component={CreateNotificationScreen}
              name={notification.name}
              options={notification.options}
            />

            <Stack.Screen
              component={NotificationOverviewScreen}
              name={notificationOverview.name}
              options={notificationOverview.options}
            />
            <Stack.Screen
              component={ProjectDetailScreen}
              name={projectDetail.name}
              options={projectDetail.options}
            />
            <Stack.Screen
              component={ProjectDetailBodyScreen}
              name={projectDetailBody.name}
              options={projectDetailBody.options}
            />
            <Stack.Screen
              component={ProjectNewsScreen}
              name={projectNews.name}
              options={projectNews.options}
            />
            <Stack.Screen
              component={ProjectOverviewScreen}
              name={projectOverview.name}
              options={projectOverview.options}
            />
            <Stack.Screen
              component={ProjectOverviewByDistrictScreen}
              name={projectOverviewByDistrict.name}
              options={projectOverviewByDistrict.options}
            />
            <Stack.Screen
              component={ProjectWarningScreen}
              name={projectWarning.name}
              options={projectWarning.options}
            />
            <Stack.Screen
              component={SettingsScreen}
              name={settings.name}
              options={settings.options}
            />
            <Stack.Screen
              component={WasteScreen}
              name={wasteGuide.name}
              options={wasteGuide.options}
            />
            <Stack.Screen
              component={WebViewScreen}
              name={webView.name}
              options={webView.options}
            />
            <Stack.Screen
              component={WhereToPutBulkyWasteScreen}
              name={whereToPutBulkyWaste.name}
              options={whereToPutBulkyWaste.options}
            />
          </Stack.Navigator>
        </RootProvider>
      </NavigationContainer>
    </>
  )
}
