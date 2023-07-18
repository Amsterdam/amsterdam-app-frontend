import {screenOptions} from '@/app/navigation'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {screenConfig} from '@/modules/report-problem/screenConfig'
import {useTheme} from '@/themes'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ReportProblemRouteName.reportProblem}
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
