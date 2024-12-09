import {useEffect} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {EnterAccessCode} from '@/modules/access-code/components/EnterAccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {AccessCodeType} from '@/modules/access-code/types'

export const AccessCodeScreen = () => {
  const navigation = useNavigation()
  const {attemptsLeft, isCodeValid} = useAccessCode()

  useEffect(() => {
    if (isCodeValid) {
      navigation.goBack()
    }
  }, [isCodeValid, navigation])

  if (attemptsLeft <= 0) {
    return <AccessCodeInvalidScreen />
  }

  return (
    <Screen
      stickyFooter={<AccessCodeKeyBoard type={AccessCodeType.codeEntered} />}
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
}
