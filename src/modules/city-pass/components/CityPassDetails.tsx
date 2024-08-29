import {skipToken} from '@reduxjs/toolkit/query'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {BudgetBalanceButton} from '@/modules/city-pass/components/BudgetBalanceButton'
import {CityPassDetailsPassNumber} from '@/modules/city-pass/components/CityPassDetailsPassNumber'
import {DiscountTransactions} from '@/modules/city-pass/components/DiscountTransactions'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {CityPass} from '@/modules/city-pass/types'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  passNumber: CityPass['passNumber']
}

export const CityPassDetails = ({passNumber}: Props) => {
  const {navigate} = useNavigation()
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const {
    data: cityPasses,
    isLoading,
    isError,
  } = useGetCityPassesQuery(secureAccessToken ? secureAccessToken : skipToken)
  const cityPass = cityPasses?.find(cp => cp.passNumber === passNumber)
  const cityPassIndex = cityPasses?.findIndex(
    cp => cp.passNumber === passNumber,
  )

  if (isLoading) {
    return <PleaseWait testID="CityPassDashboardPleaseWait" />
  }

  if (isError || !cityPass || !cityPasses) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="CityPassDashboardSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  const {
    budgets,
    dateEnd,
    dateEndFormatted,
    id,
    owner: {firstname, infix, lastname},
    passNumberComplete,
    securityCode,
  } = cityPass

  return (
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
        <ShowCityPassButton
          index={cityPassIndex}
          passCount={cityPasses.length}
        />
        <Column gutter="md">
          <CityPassDetailsPassNumber passNumberComplete={passNumberComplete} />
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
                  navigate(CityPassRouteName.securityCode, {id})
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
            key={budget.code}
            passNumber={passNumber}
          />
        ))}
        <Box insetTop="md">
          <DiscountTransactions
            dateEnd={dateEnd}
            passNumber={passNumber}
          />
        </Box>
      </Column>
    </Box>
  )
}
