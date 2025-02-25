import {useCallback, useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {ConfirmAccessCode} from '@/modules/access-code/components/ConfirmAccessCode'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useUnsetCode} from '@/modules/access-code/hooks/useUnsetCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeType} from '@/modules/access-code/types'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<AccessCodeRouteName.confirmAccessCode>

export const ConfirmAccessCodeScreen = ({navigation}: Props) => {
  const {isCodeConfirmed} = useConfirmAccessCode()
  const unsetCode = useUnsetCode()
  const isUserRoute =
    (navigation.getParent()?.getState().routes.at(-2)?.name as ModuleSlug) ===
    ModuleSlug.user

  useEffect(() => {
    if (!isCodeConfirmed) {
      return
    } else if (isUserRoute) {
      navigation.navigate(AccessCodeRouteName.validAccessCode)
    } else {
      unsetCode()
      navigation.pop(2)
    }
  }, [isCodeConfirmed, isUserRoute, navigation, unsetCode])

  const onResetAccessCode = useCallback(() => {
    unsetCode()
    navigation.pop()
  }, [navigation, unsetCode])

  return (
    <Screen
      stickyFooter={<AccessCodeKeyBoard type={AccessCodeType.codeConfirmed} />}
      testID="ConfirmAccessCodeScreen"
      withBottomInset={false}>
      <Box grow>
        <Column
          align="center"
          grow={1}
          gutter="lg">
          <Title
            level="h2"
            testID="ConfirmAccessCodeScreenTitle"
            text="Herhaal uw toegangscode"
          />
          <ConfirmAccessCode />
          <Button
            label="Toegangscode opnieuw kiezen"
            onPress={onResetAccessCode}
            testID="ConfirmAccessCodeScreenButton"
            variant="tertiary"
          />
        </Column>
      </Box>
    </Screen>
  )
}
