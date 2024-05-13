import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {screenConfig} from '@/modules/construction-work-editor/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const ConstructionWorkEditorStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkEditorRouteName.authorizedProjects}
      screenOptions={screenOptions(theme)}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
