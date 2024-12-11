import {ReactNode} from 'react'
import {Screen, ScreenProps} from '@/components/features/screen/Screen'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'

type Props = {
  children: ReactNode
} & ScreenProps

export const AccessCodeValidationBoundaryScreen = ({
  children,
  ...screenProps
}: Props) => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {isCodeValid} = useEnterAccessCode()
  const {isLoginStepsActive} = useLogin()

  if (isLoading) {
    return null
  }

  if (!isCodeValid && !!accessCode && !isLoginStepsActive) {
    return <AccessCodeScreen />
  }

  return <Screen {...screenProps}>{children}</Screen>
}
