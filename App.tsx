import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {StatusBar} from 'react-native'
import {Logo} from './src/assets/icons'
import {AddressProvider, OrientationProvider} from './src/providers'
import {
  HomeScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  WasteScreen,
  WebViewRouteParams,
  WebViewScreen,
  WhereToPutBulkyWasteScreen,
} from './src/screens'
import {CreateNotificationScreen} from './src/screens/create-notification'
import {AddressFormScreen} from './src/screens/modals/AddressFormScreen'
import {color, size} from './src/tokens'
import {NewsArticle, ProjectDetailBody} from './src/types'

export type RootStackParamList = {
  Home: undefined
  AddressForm: undefined
  ProjectDetail: {id: string}
  ProjectNews: {article: NewsArticle}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {id: number}
  PushNotification: {projectId: string}
  Waste: undefined
  WhereToPutBulkyWaste: undefined
  WebView: WebViewRouteParams
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
        backgroundColor: color.background.lighter,
      },
      presentation: 'modal',
      title: 'Uw adres',
    },
  },
  home: {
    name: 'Home',
    options: {
      headerTitle: () => <Logo width={85} />,
    },
  },
  projectDetail: {
    name: 'ProjectDetail',
  },
  projectDetailBody: {
    name: 'ProjectDetailBody',
    options: {
      cardStyle: {
        backgroundColor: color.background.lighter,
      },
    },
  },
  projectNews: {
    name: 'ProjectNews',
    options: {
      title: 'Nieuws',
      cardStyle: {
        backgroundColor: color.background.lighter,
      },
    },
  },
  projectOverview: {
    name: 'ProjectOverview',
    options: {
      title: 'Werkzaamheden',
    },
  },
  projectOverviewByDistrict: {
    name: 'ProjectOverviewByDistrict',
    options: {
      title: 'Werkzaamheden per stadsdeel',
    },
  },
  pushNotification: {
    name: 'PushNotification',
    options: {
      cardStyle: {
        backgroundColor: color.background.lighter,
      },
      presentation: 'modal',
      title: 'Pushnotificatie versturen',
    },
  },
  wasteGuide: {
    name: 'Waste',
    options: {
      cardStyle: {
        backgroundColor: color.background.lighter,
      },
      title: 'Afvalinformatie op adres',
    },
  },
  whereToPutBulkyWaste: {
    name: 'WhereToPutBulkyWaste',
    options: {title: 'Grof afval'},
  },
  webView: {
    name: 'WebView',
  },
}

const globalScreenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.light,
  },
  headerStyle: {
    backgroundColor: color.background.lighter,
  },
  headerBackImage: () => (
    <ChevronLeft
      width={20}
      height={20}
      fill={color.font.regular}
      style={{margin: size.spacing.sm}}
    />
  ),
  headerBackTitleVisible: false,
  headerBackAccessibilityLabel: 'Terug',
  headerTitleAlign: 'center',
}

export const App = () => {
  const Stack = createStackNavigator()
  const {
    addressForm,
    home,
    projectDetail,
    projectDetailBody,
    projectOverview,
    projectOverviewByDistrict,
    projectNews,
    pushNotification,
    webView,
    wasteGuide,
    whereToPutBulkyWaste,
  } = routes

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <OrientationProvider>
        <AddressProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={home.name}
              screenOptions={globalScreenOptions}>
              <Stack.Screen
                name={home.name}
                component={HomeScreen}
                options={home.options}
              />
              <Stack.Screen
                name={projectDetail.name}
                component={ProjectDetailScreen}
                options={projectDetail.options}
              />
              <Stack.Screen
                name={projectDetailBody.name}
                component={ProjectDetailBodyScreen}
                options={projectDetailBody.options}
              />
              <Stack.Screen
                name={projectNews.name}
                component={ProjectNewsScreen}
                options={projectNews.options}
              />
              <Stack.Screen
                name={projectOverview.name}
                component={ProjectOverviewScreen}
                options={projectOverview.options}
              />
              <Stack.Screen
                name={projectOverviewByDistrict.name}
                component={ProjectOverviewByDistrictScreen}
                options={projectOverviewByDistrict.options}
              />
              <Stack.Screen
                name={wasteGuide.name}
                component={WasteScreen}
                options={wasteGuide.options}
              />
              <Stack.Screen
                name={whereToPutBulkyWaste.name}
                component={WhereToPutBulkyWasteScreen}
                options={whereToPutBulkyWaste.options}
              />
              <Stack.Screen
                name={webView.name}
                component={WebViewScreen}
                options={webView.options}
              />
              <Stack.Screen
                component={AddressFormScreen}
                name={addressForm.name}
                options={addressForm.options}
              />
              <Stack.Screen
                component={CreateNotificationScreen}
                name={pushNotification.name}
                options={pushNotification.options}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AddressProvider>
      </OrientationProvider>
    </>
  )
}
