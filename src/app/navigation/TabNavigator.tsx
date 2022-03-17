import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {ActionStack, HomeStack, MenuStack, tabScreenOptions} from './'
import {TabBar} from '../../components/ui/navigation'
import {routes, tabs} from './routes'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName={tabs.home.name}
    screenOptions={tabScreenOptions}
    tabBar={props => <TabBar {...props} />}>
    <Tab.Screen
      component={HomeStack}
      name={tabs.home.name}
      options={tabs.home.options}
    />
    <Tab.Screen
      component={ActionStack}
      name={tabs.action.name}
      options={tabs.action.options}
    />
    <Tab.Screen
      component={MenuStack}
      name={tabs.menu.name}
      listeners={({navigation}) => ({
        tabPress: e => {
          e.preventDefault()
          navigation.navigate(tabs.menu.name, {
            screen: routes.menu.name,
          })
        },
      })}
      options={tabs.menu.options}
    />
  </Tab.Navigator>
)
