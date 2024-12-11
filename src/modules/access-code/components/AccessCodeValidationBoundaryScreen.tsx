import {ReactNode} from 'react'
import {Screen, ScreenProps} from '@/components/features/screen/Screen'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'

type Props = {
  children: ReactNode
} & ScreenProps

export const AccessCodeValidationBoundaryScreen = ({
  children,
  ...screenProps
}: Props) => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {isCodeValid, isLoggingIn} = useAccessCode()

  if (isLoading) {
    return null
  }

  if (!isCodeValid && !!accessCode && !isLoggingIn) {
    return <AccessCodeScreen />
  }

  return <Screen {...screenProps}>{children}</Screen>
}
