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

export const AccessCodeScreen = ({navigation}: Props) => {
  const {isCodeValid, setIsForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()
  const currentModule =
    (navigation.getParent()?.getState().routes.at(-1)?.name as ModuleSlug) ??
    ModuleSlug.home

  useEffect(() => {
    if (isCodeValid && isEnrolled && useBiometrics === undefined) {
      navigation.navigate(AccessCodeRouteName.biometricsPermission)
    }
  }, [isCodeValid, isEnrolled, navigation, useBiometrics])

  const onForgotCode = useCallback(() => {
    setIsForgotCode(true)
    // The module's stack automatically redirects user to forgot code screen.
    navigation.navigate(currentModule)
  }, [currentModule, navigation, setIsForgotCode])

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
