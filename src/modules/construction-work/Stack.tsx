import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {screenConfig} from '@/modules/construction-work/screenConfig'

const Stack = createStackNavigator()

export const ConstructionWorkStack = () => {
  const {defaultScreenOptions, getSettingOptionsForRoutes} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkRouteName.constructionWork}
      screenOptions={defaultScreenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={getSettingOptionsForRoutes([ConstructionWorkRouteName.user])}
        />
      ))}
    </Stack.Navigator>
  )
}
