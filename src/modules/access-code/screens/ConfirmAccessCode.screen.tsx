import {useFocusEffect} from '@react-navigation/core'
import {hasHardwareAsync} from 'expo-local-authentication'
import {useCallback, useEffect, useMemo} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {ConfirmAccessCode} from '@/modules/access-code/components/ConfirmAccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useSetAccessCode} from '@/modules/access-code/hooks/useSetAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeType} from '@/modules/access-code/types'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<AccessCodeRouteName.confirmAccessCode>

export const ConfirmAccessCodeScreen = ({navigation}: Props) => {
  const {setCode} = useAccessCode()
  const {isCodeConfirmed, setIsCodeConfirmed} = useConfirmAccessCode()
  const {resetError} = useAccessCodeError()
  const {useBiometrics} = useAccessCodeBiometrics()
  const {setIsCodeSet} = useSetAccessCode()
  const {setUseBiometrics} = useAccessCodeBiometrics()

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
      setCode({code: [], type: AccessCodeType.codeConfirmed})
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
      void hasHardwareAsync().then(hasHardware => {
        if (hasHardware) {
          navigation.navigate(AccessCodeRouteName.biometricsPermission)
        } else {
          setUseBiometrics(false)
        }
      })
    } else if (isUserRoute) {
      navigation.navigate(AccessCodeRouteName.validAccessCode)
    } else {
      navigation.pop(2)
    }
  }, [
    isCodeConfirmed,
    isUserRoute,
    navigation,
    setUseBiometrics,
    useBiometrics,
  ])

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
