import {useCallback} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {EnterAccessCode} from '@/modules/access-code/components/EnterAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'

export const AccessCodeScreen = () => {
  const navigation = useNavigation()
  const onIsValid = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Screen
      stickyFooter={<AccessCodeKeyBoard type={AccessCodeType.codeEntered} />}
      stickyHeader={
        <ModalHeader
          testID="AccessCodeModalHeader"
          title="Toegangscode"
        />
      }
      testID="AccessCodeModalScreen"
      withBottomInset={false}>
      <Center grow>
        <Box>
          <Column gutter="lg">
            <Title
              level="h2"
              testID="AccessCodeModalScreenTitle"
              text="Voer uw toegangscode in"
            />
            <EnterAccessCode onIsValid={onIsValid} />
            <Button
              label="Toegangscode vergeten"
              testID=""
              variant="tertiary"
            />
          </Column>
        </Box>
      </Center>
    </Screen>
  )
}
