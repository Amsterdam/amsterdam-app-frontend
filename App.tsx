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
import {color, size} from './src/tokens'
import {NewsArticle, ProjectDetailBody} from './src/types'

export type RootStackParamList = {
  Home: undefined
  Onboarding: undefined
  ProjectDetail: {id: string}
  ProjectNews: {article: NewsArticle}
  ProjectDetailBody: {body: ProjectDetailBody}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {id: number}
  Waste: undefined
  WebView: {uri: string}
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
      title: 'Bouwprojecten',
    },
  },
  projectOverviewByDistrict: {
    name: 'ProjectOverviewByDistrict',
    options: {
      title: 'Bouwprojecten per stadsdeel',
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
    options: {
      title: 'Melding',
    },
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
        </Stack.Navigator>
      </NavigationContainer>
    </OrientationProvider>
  )
}
