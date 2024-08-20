import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {BudgetBalanceButton} from '@/modules/city-pass/components/BudgetBalanceButton'
import {CityPassDetailsPassNumber} from '@/modules/city-pass/components/CityPassDetailsPassNumber'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {TransactionHistory} from '@/modules/city-pass/components/TransactionHistory'
import {transactions} from '@/modules/city-pass/mocks/transactions'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {getPreviousYear} from '@/utils/datetime/getPreviousYear'

export const CityPassDetailsScreen = () => {
  const {
    params: {
      cityPass: {
        budgets,
        dateEnd,
        dateEndFormatted,
        owner: {firstname, infix, lastname},
        passNumber,
        passNumberComplete,
        securityCode,
      },
    },
  } = useRoute<CityPassRouteName.cityPassDetails>()
  const {navigate} = useNavigation()

  return (
    <CityPassLoginBoundaryScreen testID="CityPassCityPassScreen">
      <Box grow>
        <Column gutter="lg">
          <Column halign="center">
            <SingleSelectable testID="CityPassCityPassDetailsName">
              <Title
                testID="CityPassCityPassDetailsTitle"
                text={firstname}
                textAlign="center"
              />
              <Phrase
                emphasis="strong"
                testID="CityPassCityPassDetailsSubtitle"
                textAlign="center">
                {`${infix ? infix + ' ' : ''}${lastname}`}
              </Phrase>
            </SingleSelectable>
          </Column>
          <ShowCityPassButton passCount={1} />
          <Column gutter="md">
            <CityPassDetailsPassNumber
              passNumberComplete={passNumberComplete}
            />
            {!!securityCode && (
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
            )}
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
                  {dateEndFormatted}
                </Phrase>
              </Row>
            </SingleSelectable>
          </Column>
          {budgets?.map(budget => (
            <BudgetBalanceButton
              budget={budget}
              firstname={firstname}
              key={budget.code}
              passNumber={passNumber}
            />
          ))}
          <Box insetTop="md">
            <Column gutter="md">
              <TransactionHistory
                transactions={transactions}
                type="savings"
              />
              <Paragraph textAlign="center">
                Dit waren jouw acties vanaf {getPreviousYear(dateEnd)}
              </Paragraph>
            </Column>
          </Box>
        </Column>
      </Box>
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </CityPassLoginBoundaryScreen>
  )
}
