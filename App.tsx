import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import Logo from './src/assets/icons/logo.svg'
import {OrientationProvider} from './src/providers/orientation.provider'
import {
  HomeScreen,
  ProjectDetailBodyScreen,
  ProjectDetailScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  WasteScreen,
  WebViewScreen,
} from './src/screens'
import {CreateAddressScreen} from './src/screens/CreateAddressScreen'
import {color, size} from './src/tokens'
import {NewsArticle, ProjectDetailBody} from './src/types'

export type RootStackParamList = {
  CreateAddress: {street: string} | undefined
  Home: undefined
  ProjectDetail: {id: string}
  ProjectNews: {article: NewsArticle}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {id: number}
  Waste: undefined
  WebView: {title: string; uri: string}
}

type Routes = {
  [route: string]: {
    name: keyof RootStackParamList
    title?: string
    options?: StackNavigationOptions
  }
}

export const routes: Routes = {
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
  },
  projectNews: {
    name: 'ProjectNews',
    options: {
      title: 'Nieuws',
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
  wasteGuide: {
    name: 'Waste',
    options: {
      cardStyle: {
        backgroundColor: color.background.lighter,
      },
      title: 'Afvalinformatie op adres',
    },
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
    home,
    projectDetail,
    projectDetailBody,
    projectOverview,
    projectOverviewByDistrict,
    projectNews,
    webView,
    wasteGuide,
  } = routes

  return (
    <OrientationProvider>
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
            name="Waste"
            component={WasteScreen}
            options={wasteGuide.options}
          />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={webView.options}
          />
          <Stack.Screen
            component={CreateAddressScreen}
            name="CreateAddress"
            options={{presentation: 'modal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OrientationProvider>
  )
}
