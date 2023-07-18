import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {screenConfig} from '@/modules/construction-work/screenConfig'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

export const ConstructionWorkStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkRouteName.constructionWork}
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
