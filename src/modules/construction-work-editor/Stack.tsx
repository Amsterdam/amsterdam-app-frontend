import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {screenConfig} from '@/modules/construction-work-editor/screenConfig'

const Stack = createStackNavigator()

export const ConstructionWorkEditorStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkEditorRouteName.authorizedProjects}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
