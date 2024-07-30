import {FC} from 'react'
import {Screen, ScreenProps} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {selectCityPass} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const CityPassLoginBoundaryScreen: FC<ScreenProps> = ({
  children,
  testID,
  ...props
}) => {
  const {item: secureCityPasses, isLoading} = useGetSecureItem(
    SecureItemKey.cityPasses,
  )
  // TODO: Remove once registering city-pass admin number is working
  const cityPass = useSelector(selectCityPass)

  if (isLoading) {
    return <PleaseWait testID="CityPassLoginBoundaryScreenIsWaiting" />
  }

  if (!secureCityPasses && !cityPass) {
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
