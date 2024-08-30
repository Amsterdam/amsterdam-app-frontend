import {skipToken} from '@reduxjs/toolkit/query'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {TransactionHistory} from '@/modules/city-pass/components/transactions/TransactionHistory'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetDiscountTransactionsQuery} from '@/modules/city-pass/service'
import {CityPass, TransactionType} from '@/modules/city-pass/types'
import {getPreviousYear} from '@/utils/datetime/getPreviousYear'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  dateEnd: CityPass['dateEnd']
  passNumber: CityPass['passNumber']
}

export const DiscountTransactions = ({dateEnd, passNumber}: Props) => {
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const {data, isLoading, isError, refetch} = useGetDiscountTransactionsQuery(
    secureAccessToken
      ? {accessToken: secureAccessToken, passNumber}
      : skipToken,
  )

  if (isLoading) {
    return <PleaseWait testID="CityPassDiscountTransactionsPleaseWait" />
  }

  if (isError || !data) {
    return (
      <SomethingWentWrong
        retryFn={refetch}
        testID="CityPassDiscountTransactionsSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  const {discountAmountTotalFormatted, transactions} = data

  return (
    <Column gutter="md">
      <Title text="Mijn acties" />
      <Paragraph>
        {`In in totaal heb je ${discountAmountTotalFormatted} bespaard. Deze informatie kan 1 dag achterlopen.`}
      </Paragraph>
      <TransactionHistory
        transactions={transactions}
        type={TransactionType.discount}
      />
      <Paragraph textAlign="center">
        Dit waren jouw acties vanaf {getPreviousYear(dateEnd)}
      </Paragraph>
    </Column>
  )
}
