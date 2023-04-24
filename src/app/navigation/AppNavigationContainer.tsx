import {useFlipper} from '@react-navigation/devtools'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import {ReactNode} from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {linking, RootStackParams} from '@/app/navigation'
import {useHandleNavigationStateChange} from '@/hooks'
import {registerNavigationContainer} from '@/processes'

type Props = {
  children: ReactNode
}

export const AppNavigationContainer = ({children}: Props) => {
  const navigation = useNavigationContainerRef<RootStackParams>()
  useFlipper(navigation)
  const handleNavigationStateChange = useHandleNavigationStateChange()

  return (
    <NavigationContainer
      linking={linking}
      onReady={() => {
        registerNavigationContainer(navigation)
        void RNBootSplash.hide({fade: true})
      }}
      onStateChange={handleNavigationStateChange}
      ref={navigation}>
      {children}
    </NavigationContainer>
  )
}
