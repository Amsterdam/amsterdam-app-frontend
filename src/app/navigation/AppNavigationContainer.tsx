import {useFlipper} from '@react-navigation/devtools'
import {NavigationContainer} from '@react-navigation/native'
import {type ReactNode} from 'react'
import {linking} from '@/app/navigation/linking'
import {navigationRef} from '@/app/navigation/navigationRef'
import {type RootStackParams} from '@/app/navigation/types'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {registerNavigationContainer} from '@/processes/sentry/init'

type Props = {
  children: ReactNode
}

export const AppNavigationContainer = ({children}: Props) => {
  const hideSplashScreen = useHideSplashScreen()

  useFlipper(navigationRef)

  return (
    <NavigationContainer<RootStackParams>
      linking={linking}
      onReady={() => {
        registerNavigationContainer(navigationRef)
        hideSplashScreen()
      }}
      ref={navigationRef}>
      {children}
    </NavigationContainer>
  )
}
