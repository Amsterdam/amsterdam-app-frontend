import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {AuthenticateWithCodeOrBiometrics} from '@/modules/access-code/components/AuthenticateWithCodeOrBiometrics'
import {EnterAccessCode} from '@/modules/access-code/components/EnterAccessCode'

export const AccessCodeScreen = () => (
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
            testID="AccessCodeForgotButton"
            variant="tertiary"
          />
        </Column>
      </Box>
    </Center>
  </Screen>
)
