import {useCallback, useState} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useLogout} from '@/modules/city-pass/hooks/useLogout'
import {useShouldShowLoginScreen} from '@/modules/city-pass/hooks/useShouldShowLoginScreen'
import {SecureItemKey} from '@/utils/secureStorage'

const TEST_ID = 'CityPassRestartLoginScreen'

export const RestartLoginScreen = () => {
  const [isError, setIsError] = useState(false)
  const logout = useLogout()
  const {resetAccessCode} = useAccessCode()
  const removeSecureItems = useRemoveSecureItems()
  const {setShouldShowLoginScreen} = useShouldShowLoginScreen()

  const onRestartLogin = useCallback(async () => {
    try {
      await logout()
      await removeSecureItems([SecureItemKey.accessCode])
      resetAccessCode()
      setShouldShowLoginScreen(false)
    } catch {
      setIsError(true)
    }
  }, [logout, removeSecureItems, resetAccessCode, setShouldShowLoginScreen])

  if (isError) {
    return <SomethingWentWrong testID={`${TEST_ID}SomethingWentWrong`} />
  }

  return (
    <Screen testID={TEST_ID}>
      <Box>
        <Column gutter="lg">
          <Title
            testID={`${TEST_ID}Title`}
            text="Toegangscode opnieuw instellen"
          />
          <Paragraph testID={`${TEST_ID}Paragraph`}>
            U moet opnieuw inloggen om een nieuwe toegangscode te kiezen.
          </Paragraph>
          <Button
            label="Inloggen met DigiD"
            onPress={onRestartLogin}
            testID={`${TEST_ID}Button`}
          />
        </Column>
      </Box>
    </Screen>
  )
}
