import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BalanceButton} from '@/modules/city-pass/components/BalanceButton'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {CityPassRouteName} from '@/modules/city-pass/routes'

export const CityPassDetailsScreen = () => {
  const {navigate} = useNavigation()

  return (
    <CityPassLoginBoundaryScreen testID="CityPassCityPassScreen">
      <Box grow>
        <Column gutter="lg">
          <Column halign="center">
            <Title
              testID="CityPassCityPassDetailsTitle"
              text="Ryan"
            />
            <Phrase
              emphasis="strong"
              testID="CityPassCityPassDetailsSubtitle">
              Huisman
            </Phrase>
          </Column>
          <ShowCityPassButton passCount={3} />
          <Column gutter="md">
            <Row
              align="between"
              gutter="md">
              <Phrase testID="CityPassCityPassDetailsPassNumberLabel">
                Pasnummer
              </Phrase>
              <Phrase
                emphasis="strong"
                selectable
                testID="CityPassCityPassDetailsPassNumberValue">
                6064 3660 1101 2605 999
              </Phrase>
            </Row>
            <Row
              align="between"
              gutter="md">
              <Phrase testID="CityPassCityPassDetailsSecurityCodeLabel">
                Beveiligingscode
              </Phrase>
              <Button
                label="Toon"
                onPress={() => {
                  navigate(CityPassRouteName.securityCode)
                }}
                testID="CityPassCityPassDetailsSecurityCodeButton"
                variant="secondary"
              />
            </Row>
            <Row
              align="between"
              gutter="md">
              <Phrase testID="CityPassCityPassDetailsExpiryDateLabel">
                Geldig tot en met
              </Phrase>
              <Phrase
                emphasis="strong"
                testID="CityPassCityPassDetailsExpiryDateValue">
                31 juli 2024
              </Phrase>
            </Row>
          </Column>
          <BalanceButton />
        </Column>
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
