import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import ChevronLeft from './src/assets/icons/chevron-left.svg'
import Logo from './src/assets/icons/logo.svg'
import {HomeScreen, ProjectOverviewScreen, ReportScreen} from './src/screens'

export type RootStackParamList = {
  Home: undefined
  Projects: undefined
  Report: {uri: string}
}

type Routes = {
  [route: string]: {
    name: string
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
  projects: {
    name: 'Projects',
    options: {
      title: 'Bouwprojecten',
    },
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
  headerBackImage: () => <ChevronLeft width={20} height={20} fill={'black'} />,
  headerBackTitleVisible: false,
  headerBackAccessibilityLabel: 'Back button',
  headerTitleAlign: 'center',
}

export const App = () => {
  const Stack = createStackNavigator()
  const {home, projects, report} = routes

  return (
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
          name={projects.name}
          component={ProjectOverviewScreen}
          options={projects.options}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={report.options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
