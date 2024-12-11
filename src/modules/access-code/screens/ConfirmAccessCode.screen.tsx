import {useFocusEffect} from '@react-navigation/core'
import {useCallback, useEffect, useMemo} from 'react'
import {StackNavigationProp} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {ConfirmAccessCode} from '@/modules/access-code/components/ConfirmAccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeType} from '@/modules/access-code/types'
import {ModuleSlug} from '@/modules/slugs'

export const ConfirmAccessCodeScreen = () => {
  const navigation = useNavigation()
  const {
    setIsCodeConfirmed,
    setIsCodeSet,
    resetError,
    setCode,
    isCodeConfirmed,
    useBiometrics,
  } = useAccessCode()

  const isUserRoute = useMemo(
    () =>
      navigation
        .getParent()
        ?.getState()
        .routes.some(route => route.name === (ModuleSlug.user as string)),
    [navigation],
  )

  useFocusEffect(
    useCallback(() => {
      resetError()
    }, [resetError]),
  )

  useEffect(() => {
    const listener = navigation.addListener('blur', () => {
      setCode({code: [], type: AccessCodeType.codeSet})
      setCode({code: [], type: AccessCodeType.codeConfirmed})
      setIsCodeSet(false)
      setIsCodeConfirmed(false)
    })

    return () => {
      listener()
    }
  }, [navigation, setCode, setIsCodeConfirmed, setIsCodeSet])

  useEffect(() => {
    if (!isCodeConfirmed) {
      return
    }

    if (useBiometrics === undefined) {
      navigation.navigate(AccessCodeRouteName.biometricsPermission)
    } else if (isUserRoute) {
      navigation.navigate(AccessCodeRouteName.validAccessCode)
    } else {
      navigation
        .getParent<StackNavigationProp<AccessCodeRouteName.confirmAccessCode>>()
        .pop()
    }
  }, [isCodeConfirmed, isUserRoute, navigation, useBiometrics])

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
            onPress={navigation.goBack}
            testID="ConfirmAccessCodeScreenButton"
            variant="tertiary"
          />
        </Column>
      </Box>
    </Screen>
  )
}
