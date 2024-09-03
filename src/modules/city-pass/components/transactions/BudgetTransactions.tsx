import {skipToken} from '@reduxjs/toolkit/query'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {TransactionHistory} from '@/modules/city-pass/components/transactions/TransactionHistory'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetBudgetTransactionsQuery} from '@/modules/city-pass/service'
import {CityPass, TransactionType} from '@/modules/city-pass/types'
import {getPreviousYear} from '@/utils/datetime/getPreviousYear'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  budgetCode: string
  dateEnd: CityPass['dateEnd']
  passNumber: CityPass['passNumber']
}

export const BudgetTransactions = ({
  budgetCode,
  dateEnd,
  passNumber,
}: Props) => {
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const {
    data: budgetTransactions,
    isLoading,
    isError,
  } = useGetBudgetTransactionsQuery(
    secureAccessToken
      ? {accessToken: secureAccessToken, passNumber, budgetCode}
      : skipToken,
  )

  if (isLoading) {
    return <PleaseWait testID="CityPassBudgetPleaseWait" />
  }

  if (isError || !budgetTransactions) {
    return (
      <SomethingWentWrong
        testID="CityPassBudgetSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  return (
    <Column gutter="md">
      <Title text="Betalingen" />
      <Paragraph>
        Deze informatie kan 1 dag achterlopen. Het saldo dat je nog over hebt
        klopt altijd.
      </Paragraph>
      <TransactionHistory
        transactions={budgetTransactions}
        type={TransactionType.budget}
      />
      <Paragraph textAlign="center">
        Dit zijn alle betalingen vanaf {getPreviousYear(dateEnd)}
      </Paragraph>
    </Column>
  )
}
