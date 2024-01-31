import {useFlipper} from '@react-navigation/devtools'
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native'
import {type ReactNode} from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {linking} from '@/app/navigation/linking'
import {type RootStackParams} from '@/app/navigation/types'
import {registerNavigationContainer} from '@/processes/sentry/init'

type Props = {
  children: ReactNode
}

export const navigationRef = createNavigationContainerRef<RootStackParams>()

export const AppNavigationContainer = ({children}: Props) => {
  useFlipper(navigationRef)

  return (
    <NavigationContainer<RootStackParams>
      linking={linking}
      onReady={() => {
        registerNavigationContainer(navigationRef)
        void RNBootSplash.hide({fade: true})
      }}
      ref={navigationRef}>
      {children}
    </NavigationContainer>
  )
}
