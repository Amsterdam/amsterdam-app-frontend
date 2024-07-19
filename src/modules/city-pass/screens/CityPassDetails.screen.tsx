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
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {Transaction} from '@/modules/city-pass/types'
import {formatDate} from '@/utils/datetime/formatDate'

const omschrijving = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

const transactions: Transaction[] = [
  {
    id: 1,
    aanbieder: {
      id: 1,
      naam: 'Over het IJ Festival',
    },
    bedrag: 104.95,
    omschrijving,
    transactiedatum: '2024-06-10T04:01:01.0000',
  },
  {
    id: 2,
    aanbieder: {
      id: 2,
      naam: 'Stedelijk Museum Amsterdam',
    },
    bedrag: 22.5,
    omschrijving,
    transactiedatum: '2024-06-10T04:01:01.0000',
  },
  {
    id: 3,
    aanbieder: {
      id: 3,
      naam: 'ARTIS',
    },
    bedrag: 29.95,
    omschrijving,
    transactiedatum: '2024-06-04T04:01:01.0000',
  },
  {
    id: 4,
    aanbieder: {
      id: 4,
      naam: 'NEMO Science Museum',
    },
    bedrag: 27.5,
    omschrijving,
    transactiedatum: '2024-05-22T04:01:01.0000',
  },
  {
    id: 5,
    aanbieder: {
      id: 5,
      naam: 'Eye Filmmuseum',
    },
    bedrag: 11.5,
    omschrijving,
    transactiedatum: '2024-05-22T04:01:01.0000',
  },
  {
    id: 6,
    aanbieder: {
      id: 2,
      naam: 'Stedelijk Museum Amsterdam',
    },
    bedrag: 22.5,
    omschrijving,
    transactiedatum: '2024-05-06T04:01:01.0000',
  },
  {
    id: 7,
    aanbieder: {
      id: 3,
      naam: 'ARTIS',
    },
    bedrag: 29.95,
    omschrijving,
    transactiedatum: '2024-02-16T04:01:01.0000',
  },
]

export const CityPassDetailsScreen = () => {
  const {
    params: {
      passOwner: {achternaam, passen, voornaam},
    },
  } = useRoute<CityPassRouteName.cityPassDetails>()
  const {navigate} = useNavigation()
  const activePass = passen.find(pass => pass.actief)
  const {expiry_date, pasnummer} = activePass ?? {}

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
            <SingleSelectable testID="CityPassCityPassDetailsPassNumber">
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
                  {pasnummer}
                </Phrase>
              </Row>
            </SingleSelectable>
            <SingleSelectable testID="CityPassCityPassDetailsSecurityCode">
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
            </SingleSelectable>
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
          {cityPass.budgetten.map(budget => (
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
