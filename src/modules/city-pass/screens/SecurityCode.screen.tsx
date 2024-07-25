import {useCallback} from 'react'
import {Alert, AccessibilityInfo} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useBiometrics} from '@/hooks/useBiometrics'
import {useBlockScreenshots} from '@/hooks/useBlockScreenshots'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {pronounceCharacters} from '@/utils/accessibility/pronounceCharacters'

export const SecurityCodeScreen = () => {
  useSetScreenTitle('Ryan')
  const {authenticated, authenticate} = useBiometrics({
    promptMessage: 'Ontgrendel de beveiligingscode van je stadspas',
    cancelButtonText: 'Terug',
    fallbackPromptMessage: 'Ontgrendel de beveiligingscode',
  })

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

  const securityCode = 1234

  return (
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
  )
}
