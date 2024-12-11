import {FC} from 'react'
import {ScreenProps} from '@/components/features/screen/Screen'
import {useSelector} from '@/hooks/redux/useSelector'
import {AccessCodeValidationBoundaryScreen} from '@/modules/access-code/components/AccessCodeValidationBoundaryScreen'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'
import {LoginScreen} from '@/modules/city-pass/screens/Login.screen'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'

export const CityPassLoginBoundaryScreen: FC<ScreenProps> = ({
  children,
  testID,
  ...props
}) => {
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {isLoginStepsActive} = useLogin()

  if (isLoading) {
    return null
  }

  if (!isCityPassOwnerRegistered || !accessCode || isLoginStepsActive) {
    return <LoginScreen />
  }

  return (
    <AccessCodeValidationBoundaryScreen
      testID={testID}
      {...props}>
      {children}
    </AccessCodeValidationBoundaryScreen>
  )
}
