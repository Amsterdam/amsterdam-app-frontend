import {RouteProp} from '@react-navigation/core/lib/typescript/src/types'
import {ParamListBase} from '@react-navigation/native'
import {StackHeaderProps, StackNavigationOptions} from '@react-navigation/stack'
import {useCallback, useMemo} from 'react'
import {Platform, StatusBar} from 'react-native'
import {Header} from '@/modules/home/components/Header'
import {useTheme} from '@/themes/useTheme'

const getScreenOptions = (backgroundColor: string): StackNavigationOptions => ({
  cardStyle: {
    backgroundColor,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : undefined,
  },
  header: (props: StackHeaderProps) => (
    <Header
      {...props}
      backgroundColor={backgroundColor}
    />
  ),
  headerMode: 'screen',
})

type GetStackNavigationOptions = (props: {
  navigation: unknown
  route: RouteProp<ParamListBase, string>
}) => StackNavigationOptions

type UseScreenOptions = {
  defaultScreenOptions: StackNavigationOptions
  /**
   * Takes an array of route names and returns the options with the "settings" styling for those routes only. Returns the default options for any route not in the array.
   */
  getSettingOptionsForRoutes: (
    routeNames: string[],
    originalOptions?: Partial<StackNavigationOptions>,
  ) => GetStackNavigationOptions
  settingsScreenOptions: StackNavigationOptions
}

export const useScreenOptions = (): UseScreenOptions => {
  const {color} = useTheme()

  const [defaultScreenOptions, settingsScreenOptions] = useMemo(
    () => [
      getScreenOptions(color.screen.background.default),
      getScreenOptions(color.screen.background.settings),
    ],
    [color.screen.background.default, color.screen.background.settings],
  )

  return {
    defaultScreenOptions,
    getSettingOptionsForRoutes: useCallback(
      (routeNames, originalOptions) =>
        ({route: {name}}) => {
          if (routeNames.includes(name)) {
            return {...originalOptions, ...settingsScreenOptions}
          }

          return {...originalOptions, ...defaultScreenOptions}
        },
      [defaultScreenOptions, settingsScreenOptions],
    ),
    settingsScreenOptions,
  }
}
