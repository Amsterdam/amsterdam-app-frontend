import {screenOptions} from '@/app/navigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {screenConfig} from '@/modules/construction-work/screenConfig'
import {useTheme} from '@/themes'
import {createStackNavigator} from '@/utils/navigation'

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
