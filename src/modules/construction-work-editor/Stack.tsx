import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {constructionWorkEditorScreenConfig} from './screenConfig'
import {screenOptions} from '@/app/navigation'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ConstructionWorkEditorStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={constructionWorkEditorScreenConfig.MyProjects.name}
      screenOptions={screenOptions(theme)}>
      {Object.entries(constructionWorkEditorScreenConfig).map(
        ([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ),
      )}
    </Stack.Navigator>
  )
}
