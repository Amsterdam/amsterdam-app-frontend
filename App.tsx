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
  ProjectDetailContactScreen,
  ProjectDetailInformationScreen,
  ProjectDetailScreen,
  ProjectDetailTimelineScreen,
  ProjectDetailWorkScreen,
  ProjectNewsScreen,
  ProjectOverviewByDistrictScreen,
  ProjectOverviewScreen,
  ReportScreen,
  WasteGuideScreen,
} from './src/screens'
import {color, size} from './src/tokens'
import {NewsArticle, ProjectDetail} from './src/types'

export type RootStackParamList = {
  Home: undefined
  ProjectDetail: {url: string}
  ProjectNews: {newsArticle: NewsArticle}
  ProjectDetailContact: {project: ProjectDetail}
  ProjectDetailInformation: {project: ProjectDetail}
  ProjectDetailTimeline: {project: ProjectDetail}
  ProjectDetailWork: {project: ProjectDetail}
  ProjectOverview: undefined
  ProjectOverviewByDistrict: {districtId: number}
  Report: {uri: string}
  WasteGuide: undefined
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
  projectDetail: {
    name: 'ProjectDetail',
  },
  projectNews: {
    name: 'ProjectNews',
    options: {
      title: 'Nieuws',
    },
  },
  projectDetailContact: {
    name: 'ProjectDetailContact',
  },
  projectDetailInformation: {
    name: 'ProjectDetailInformation',
  },
  projectDetailTimeline: {
    name: 'ProjectDetailTimeline',
  },
  projectDetailWork: {
    name: 'ProjectDetailWork',
  },
  report: {
    name: 'Report',
    options: {
      title: 'Melding',
    },
  },
  wasteGuide: {
    name: 'WasteGuide',
    options: {
      title: 'Afvalinformatie op adres',
    },
  },
}

const globalScreenOptions: StackNavigationOptions = {
  cardStyle: {backgroundColor: color.background.light},
  headerStyle: {
    backgroundColor: 'white',
  },
  headerBackImage: () => (
    <ChevronLeft
      width={20}
      height={20}
      fill={'black'}
      style={{margin: size.spacing.sm}}
    />
  ),
  headerBackTitleVisible: false,
  headerBackAccessibilityLabel: 'Back button',
  headerTitleAlign: 'center',
}

export const App = () => {
  const Stack = createStackNavigator()
  const {
    home,
    projectDetail,
    projectDetailContact,
    projectDetailInformation,
    projectDetailTimeline,
    projectDetailWork,
    projectOverview,
    projectOverviewByDistrict,
    projectNews,
    report,
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
            name={projectDetail.name}
            component={ProjectDetailScreen}
            options={projectDetail.options}
          />
          <Stack.Screen
            name={projectDetailContact.name}
            component={ProjectDetailContactScreen}
            options={projectDetailContact.options}
          />
          <Stack.Screen
            name={projectDetailInformation.name}
            component={ProjectDetailInformationScreen}
            options={projectDetailInformation.options}
          />
          <Stack.Screen
            name={projectDetailTimeline.name}
            component={ProjectDetailTimelineScreen}
            options={projectDetailTimeline.options}
          />
          <Stack.Screen
            name={projectDetailWork.name}
            component={ProjectDetailWorkScreen}
            options={projectDetailWork.options}
          />
          <Stack.Screen
            name={projectNews.name}
            component={ProjectNewsScreen}
            options={projectNews.options}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={report.options}
          />
          <Stack.Screen
            name="WasteGuide"
            component={WasteGuideScreen}
            options={wasteGuide.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OrientationProvider>
  )
}
