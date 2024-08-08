import {FC} from 'react'
import {Screen, ScreenProps} from '@/components/features/screen/Screen'
import {useSelector} from '@/hooks/redux/useSelector'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'

export const CityPassLoginBoundaryScreen: FC<ScreenProps> = ({
  children,
  testID,
  ...props
}) => {
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)

  if (!isCityPassOwnerRegistered) {
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
