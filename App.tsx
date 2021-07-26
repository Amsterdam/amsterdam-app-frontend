import ChevronLeft from '@amsterdam/asc-assets/static/icons/ChevronLeft.svg'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import Logo from './src/assets/icons/logo.svg'
import {NewsArticle, Project} from './src/data/projects'
import {OrientationProvider} from './src/providers/orientation.provider'
import {
  HomeScreen,
  ProjectDetailContactScreen,
  ProjectDetailInformationScreen,
  ProjectDetailScreen,
  ProjectDetailTimelineScreen,
  ProjectNewsScreen,
  ProjectOverviewByBoroughScreen,
  ProjectOverviewScreen,
  ReportScreen,
} from './src/screens'
import {size} from './src/tokens'

export type RootStackParamList = {
  Home: undefined
  ProjectDetail: {id: string}
  ProjectNews: {newsArticle: NewsArticle}
  ProjectDetailContact: {project: Project}
  ProjectDetailInformation: {project: Project}
  ProjectDetailTimeline: {project: Project}
  ProjectOverview: undefined
  ProjectOverviewByBorough: {boroughId: number}
  Report: {uri: string}
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
  projectOverviewByBorough: {
    name: 'ProjectOverviewByBorough',
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
  report: {
    name: 'Report',
    options: {
      title: 'Melding',
    },
  },
}

const globalScreenOptions: StackNavigationOptions = {
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
    projectOverview,
    projectOverviewByBorough,
    projectNews,
    report,
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
            name={projectOverviewByBorough.name}
            component={ProjectOverviewByBoroughScreen}
            options={projectOverviewByBorough.options}
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
            name={projectNews.name}
            component={ProjectNewsScreen}
            options={projectNews.options}
          />
          <Stack.Screen
            name="Report"
            component={ReportScreen}
            options={report.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OrientationProvider>
  )
}
