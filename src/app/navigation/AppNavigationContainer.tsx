import {NavigationContainer} from '@react-navigation/native'
import {type ReactNode} from 'react'
import {linking} from '@/app/navigation/linking'
import {navigationRef} from '@/app/navigation/navigationRef'
import {type RootStackParams} from '@/app/navigation/types'
import {useFlipperForAndroid} from '@/hooks/useFlipperForAndroid'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {useLogStartup} from '@/processes/logging/hooks/useLogStartup'
import {registerNavigationContainer} from '@/processes/sentry/init'

type Props = {
  children: ReactNode
}

export const AppNavigationContainer = ({children}: Props) => {
  const hideSplashScreen = useHideSplashScreen()
  const logStartup = useLogStartup()

  useFlipperForAndroid(navigationRef)

  return (
    <NavigationContainer<RootStackParams>
      linking={linking}
      onReady={() => {
        registerNavigationContainer(navigationRef)
        hideSplashScreen()
        logStartup()
      }}
      ref={navigationRef}>
      {children}
    </NavigationContainer>
  )
}
