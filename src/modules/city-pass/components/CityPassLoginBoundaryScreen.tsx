import {FC} from 'react'
import {Screen, ScreenProps} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {SecureItemKey} from '@/utils/secureStorage'

export const CityPassLoginBoundaryScreen: FC<ScreenProps> = ({
  children,
  testID,
  ...props
}) => {
  const {item: secureCityPasses, isLoading} = useGetSecureItem(
    SecureItemKey.cityPasses,
  )

  if (isLoading) {
    return <PleaseWait testID="CityPassLoginBoundaryScreenIsWaiting" />
  }

  if (!secureCityPasses) {
    return <LoginScreen />
  }

  return (
    <Screen
      testID={testID}
      {...props}>
      {children}
    </Screen>
  )
}
