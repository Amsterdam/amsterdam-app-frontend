import {useCallback, useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {AuthenticateWithCodeOrBiometrics} from '@/modules/access-code/components/AuthenticateWithCodeOrBiometrics'
import {EnterAccessCode} from '@/modules/access-code/components/EnterAccessCode'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<AccessCodeRouteName.accessCode>

export const AccessCodeScreen = ({navigation: {navigate}}: Props) => {
  const {isCodeValid, setIsForgotCode} = useEnterAccessCode()
  const {useBiometrics} = useAccessCodeBiometrics()

  useEffect(() => {
    if (isCodeValid && useBiometrics === undefined) {
      navigate(AccessCodeRouteName.biometricsPermission)
    }
  }, [isCodeValid, navigate, useBiometrics])

  const onForgotCode = useCallback(() => {
    setIsForgotCode(true)
    navigate(ModuleSlug['city-pass'])
  }, [navigate, setIsForgotCode])

  return (
    <Screen
      stickyFooter={<AuthenticateWithCodeOrBiometrics />}
      testID="AccessCodeScreen"
      withBottomInset={false}>
      <Center grow>
        <Box>
          <Column gutter="lg">
            <Title
              level="h2"
              testID="AccessCodeScreenTitle"
              text="Voer uw toegangscode in"
            />
            <EnterAccessCode />
            <Button
              label="Toegangscode vergeten"
              onPress={onForgotCode}
              testID="AccessCodeForgotButton"
              variant="tertiary"
            />
          </Column>
        </Box>
      </Center>
    </Screen>
  )
}
