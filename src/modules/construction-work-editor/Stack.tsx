import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {screenOptions} from '@/app/navigation/screenOptions'
import {StackNavigationRoutes} from '@/app/navigation/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {screenConfig} from '@/modules/construction-work-editor/screenConfig'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {useTheme} from '@/themes/useTheme'

const Stack = createStackNavigator()

const getPermittedScreens = (
  routes: StackNavigationRoutes<
    ConstructionWorkEditorStackParams,
    ConstructionWorkEditorRouteName
  >,
  isEmployee: boolean,
) => {
  const screens = Object.entries(routes)
  const permittedScreens = isEmployee
    ? screens
    : screens.filter(
        ([, route]) =>
          !route.hasOwnProperty('requiresAuthorization') ||
          !route.requiresAuthorization,
      )

  return permittedScreens.map(([key, route]) => (
    <Stack.Screen
      key={key}
      {...route}
    />
  ))
}

export const ConstructionWorkEditorStack = () => {
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName={ConstructionWorkEditorRouteName.authorizedProjects}
      screenOptions={screenOptions(theme)}>
      {getPermittedScreens(screenConfig, !!constructionWorkEditorId)}
    </Stack.Navigator>
  )
}
