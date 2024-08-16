import {skipToken} from '@reduxjs/toolkit/query'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {TransactionHistory} from '@/modules/city-pass/components/TransactionHistory'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useGetBudgetTransactionsQuery} from '@/modules/city-pass/service'
import {getPreviousYear} from '@/utils/datetime/getPreviousYear'
import {SecureItemKey} from '@/utils/secureStorage'

export const BudgetScreen = () => {
  const {
    params: {
      budget: {
        budgetBalanceFormatted,
        budgetAssignedFormatted,
        code,
        dateEnd,
        dateEndFormatted,
        title,
      },
      firstname,
      passNumber,
    },
  } = useRoute<CityPassRouteName.budget>()
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const {
    data: budgetTransactions,
    isLoading,
    isError,
  } = useGetBudgetTransactionsQuery(
    secureAccessToken
      ? {accessToken: secureAccessToken, passNumber, budgetCode: code}
      : skipToken,
  )

  useSetScreenTitle(firstname)

  if (isLoading) {
    return <PleaseWait testID="CityPassBudgetPleaseWait" />
  }

  if (isError || !budgetTransactions) {
    return (
      <SomethingWentWrong text="Er ging iets mis met het ophalen van de budget informatie." />
    )
  }

  return (
    <CityPassLoginBoundaryScreen testID="CityPassBalanceScreen">
      <Box>
        <Column gutter="lg">
          <Column
            gutter="md"
            halign="center">
            <Title
              testID="CityPassBalanceTitleLabel"
              text={title}
              textAlign="center"
            />
            <Title
              testID="CityPassBalanceTitleValue"
              text={budgetBalanceFormatted}
            />
            <Column halign="center">
              <Paragraph>{`Was in het begin ${budgetAssignedFormatted}.`}</Paragraph>
              <Paragraph>{`Geldig tot en met ${dateEndFormatted}.`}</Paragraph>
            </Column>
          </Column>
          <TransactionHistory
            transactions={budgetTransactions}
            type="budget"
          />
          <Paragraph textAlign="center">
            Dit zijn alle betalingen vanaf {getPreviousYear(dateEnd)}
          </Paragraph>
        </Column>
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
