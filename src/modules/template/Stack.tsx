import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {screenOptions} from '../../app/navigation'
import {selectTheme} from '../../themes/themeSlice'
import {templateRoutes as routes} from './routes'

const Stack = createStackNavigator()

export const TemplateStack = () => {
  const {theme} = useSelector(selectTheme)

  return (
    <Stack.Navigator
      initialRouteName={routes.template.name}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, {component, name, options}]) => (
        <Stack.Screen
          component={component!} // TODO Remove "!" when component is no longer optional
          key={key}
          name={name}
          options={options}
        />
      ))}
    </Stack.Navigator>
  )
}
