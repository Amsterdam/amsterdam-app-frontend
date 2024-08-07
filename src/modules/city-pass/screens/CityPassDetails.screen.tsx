import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {BudgetBalanceButton} from '@/modules/city-pass/components/BudgetBalanceButton'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {TransactionHistory} from '@/modules/city-pass/components/TransactionHistory'
import {cityPass} from '@/modules/city-pass/mocks/cityPass'
import {transactions} from '@/modules/city-pass/mocks/transactions'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {CityPassOld} from '@/modules/city-pass/types'
import {formatDate} from '@/utils/datetime/formatDate'
import {stringGroupInto} from '@/utils/stringGroupInto'

export const CityPassDetailsScreen = () => {
  const {
    params: {
      passOwner: {achternaam, passen, voornaam},
    },
  } = useRoute<CityPassRouteName.cityPassDetails>()
  const {navigate} = useNavigation()
  const activePass = passen.find(pass => pass.actief) ?? ({} as CityPassOld) // There is always an active pass
  const {expiry_date, pasnummer_volledig} = activePass
  const budgets = cityPass.find(
    pass => pass.pasnummer_volledig === activePass?.pasnummer_volledig,
  )?.budgetten

  return (
    <CityPassLoginBoundaryScreen testID="CityPassCityPassScreen">
      <Box grow>
        <Column gutter="lg">
          <Column halign="center">
            <SingleSelectable testID="CityPassCityPassDetailsName">
              <Title
                testID="CityPassCityPassDetailsTitle"
                text={voornaam}
              />
              <Phrase
                emphasis="strong"
                testID="CityPassCityPassDetailsSubtitle">
                {achternaam}
              </Phrase>
            </SingleSelectable>
          </Column>
          <ShowCityPassButton passCount={1} />
          <Column gutter="md">
            <Row
              align="between"
              gutter="md">
              <HideFromAccessibility>
                <Phrase testID="CityPassCityPassDetailsPassNumberLabel">
                  Pasnummer
                </Phrase>
              </HideFromAccessibility>
              <Phrase
                accessibilityLabel={`Pasnummer ${stringGroupInto(pasnummer_volledig, 4)}`}
                emphasis="strong"
                selectable
                testID="CityPassCityPassDetailsPassNumberValue">
                {stringGroupInto(pasnummer_volledig, 4)}
              </Phrase>
            </Row>
            <Row
              align="between"
              gutter="md"
              valign="center">
              <HideFromAccessibility>
                <Phrase testID="CityPassCityPassDetailsSecurityCodeLabel">
                  Beveiligingscode
                </Phrase>
              </HideFromAccessibility>
              <Button
                accessibilityLabel="Toon beveiligingscode"
                label="Toon"
                onPress={() => {
                  navigate(CityPassRouteName.securityCode)
                }}
                testID="CityPassCityPassDetailsSecurityCodeButton"
                variant="secondary"
              />
            </Row>
            <SingleSelectable testID="CityPassCityPassDetailsExpiryDate">
              <Row
                align="between"
                gutter="md">
                <Phrase testID="CityPassCityPassDetailsExpiryDateLabel">
                  Geldig tot en met
                </Phrase>
                <Phrase
                  emphasis="strong"
                  testID="CityPassCityPassDetailsExpiryDateValue">
                  {expiry_date ? formatDate(expiry_date) : ''}
                </Phrase>
              </Row>
            </SingleSelectable>
          </Column>
          {budgets?.map(budget => (
            <BudgetBalanceButton
              budget={budget}
              key={budget.code}
            />
          ))}
          <Box insetTop="md">
            <TransactionHistory
              transactions={transactions}
              type="savings"
            />
          </Box>
        </Column>
      </Box>
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </CityPassLoginBoundaryScreen>
  )
}
