import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useScreenOptions} from '@/hooks/navigation/useScreenOptions'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {screenConfig} from '@/modules/report-problem/screenConfig'

const Stack = createStackNavigator()

export const ReportProblemStack = () => {
  const {defaultScreenOptions} = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={ReportProblemRouteName.reportProblem}
      screenOptions={defaultScreenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
