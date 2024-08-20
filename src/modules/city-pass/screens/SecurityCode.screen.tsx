import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect} from 'react'
import {Alert, AccessibilityInfo} from 'react-native'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useBiometrics} from '@/hooks/useBiometrics'
import {useBlockScreenshots} from '@/hooks/useBlockScreenshots'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {pronounceCharacters} from '@/utils/accessibility/pronounceCharacters'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = NavigationProps<CityPassRouteName.securityCode>

export const SecurityCodeScreen = ({route}: Props) => {
  const {id} = route.params || {}

  const {authenticated, authenticate} = useBiometrics({
    autoTrigger: false,
    promptMessage: 'Ontgrendel de beveiligingscode van je stadspas',
    cancelButtonText: 'Terug',
    fallbackPromptMessage: 'Ontgrendel de beveiligingscode',
  })

  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const {
    data: cityPasses,
    isFetching,
    isError,
  } = useGetCityPassesQuery(
    secureAccessToken && id ? secureAccessToken : skipToken,
  )

  const cityPass = cityPasses?.find(cp => cp.id === id)
  const securityCode = cityPass?.securityCode

  useSetScreenTitle(cityPass?.owner.firstname)

  const onScreenshot = useCallback(() => {
    const screenshotMessage = 'Dit scherm staat geen schermafdrukken toe'

    Alert.alert(screenshotMessage)
    AccessibilityInfo.announceForAccessibilityWithOptions(screenshotMessage, {
      queue: true,
    })
  }, [])

  useBlockScreenshots({
    enabled: true,
    onScreenshot,
  })

  useEffect(() => {
    if (securityCode) {
      void authenticate()
    }
  }, [securityCode, authenticate])

  if (isFetching) {
    return <PleaseWait testID="CityPassSecurityCodePleaseWait" />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (cityPasses && !securityCode) {
    return (
      <AlertNegative
        inset="md"
        testID="CityPassSecurityCodeAlertNegative310583"
        text="Deze pas bevat geen beveiligingscode."
        title="Sorry …"
      />
    )
  }

  return securityCode ? (
    <CityPassLoginBoundaryScreen testID="CityPassSecurityCodeScreen">
      <Center grow>
        <Box>
          <Column
            gutter="lg"
            halign="center">
            <Title
              testID="CityPassSecurityCodeTitle"
              text="Beveiligingscode"
            />
            <Row>
              {authenticated ? (
                <Title
                  accessibilityLabel={pronounceCharacters(securityCode)}
                  level="h4"
                  text={securityCode.toString()}
                />
              ) : (
                <Button
                  label="Toon"
                  onPress={authenticate}
                  testID="CityPassSecurityCodeButton"
                  variant="secondary"
                />
              )}
            </Row>
            <Paragraph
              testID="CityPassSecurityCodeText"
              textAlign="center">
              Deze code is strikt persoonlijk, deel deze niet met andere mensen.
            </Paragraph>
          </Column>
        </Box>
      </Center>
    </CityPassLoginBoundaryScreen>
  ) : null
}
