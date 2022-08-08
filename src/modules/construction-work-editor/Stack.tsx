import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import {screenOptions} from '@/app/navigation'
import {constructionWorkEditorScreenConfig} from '@/modules/construction-work-editor/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ConstructionWorkEditorStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={
        constructionWorkEditorScreenConfig.authorizedProjects.name
      }
      screenOptions={screenOptions(theme)}>
      {Object.entries(constructionWorkEditorScreenConfig).map(
        ([key, route]) => (
          <Stack.Screen key={key} {...route} />
        ),
      )}
    </Stack.Navigator>
  )
}
