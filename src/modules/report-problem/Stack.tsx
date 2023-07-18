import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {screenConfig} from '@/modules/report-problem/screenConfig'
import {useTheme} from '@/themes/useTheme'

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
