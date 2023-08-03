import {ParamListBase} from '@react-navigation/core'
// eslint-disable-next-line no-restricted-imports
import {createStackNavigator as createStackNavigatorOriginal} from '@react-navigation/stack'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'

export const createStackNavigator = <T extends ParamListBase>() => {
  const {Navigator, ...rest} = createStackNavigatorOriginal<T>()

  const CustomNavigator: typeof Navigator = ({screenOptions, ...props}) => {
    const isReduceMotionEnabled = useIsReduceMotionEnabled()

    return (
      <Navigator
        {...props}
        screenOptions={{
          animationEnabled: !isReduceMotionEnabled,
          ...screenOptions,
        }}
      />
    )
  }

  return {...rest, Navigator: CustomNavigator}
}
