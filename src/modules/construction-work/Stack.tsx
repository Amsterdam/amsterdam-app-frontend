import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {constructionWorkScreenConfig as routes} from '@/modules/construction-work/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ConstructionWorkStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkRouteName.projects}
      screenOptions={screenOptions(theme)}>
      {Object.entries(routes).map(([key, route]) => (
        <Stack.Screen key={key} {...route} />
      ))}
    </Stack.Navigator>
  )
}
