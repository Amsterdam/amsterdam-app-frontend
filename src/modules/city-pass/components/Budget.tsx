import {skipToken} from '@reduxjs/toolkit/query'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {CityPassFullScreenError} from '@/modules/city-pass/components/error/CityPassFullScreenError'
import {BudgetTransactions} from '@/modules/city-pass/components/transactions/BudgetTransactions'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {CityPass, CityPassBudget} from '@/modules/city-pass/types'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  budgetCode: CityPassBudget['code']
  passNumber: CityPass['passNumber']
}

export const Budget = ({budgetCode, passNumber}: Props) => {
  const {item: secureAccessToken, isLoading: isLoadingSecureAccessToken} =
    useGetSecureItem(SecureItemKey.cityPassAccessToken)

  const {
    data: cityPasses,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetCityPassesQuery(secureAccessToken ? secureAccessToken : skipToken)
  const cityPass = cityPasses?.find(cp => cp.passNumber === passNumber)

  useSetScreenTitle(cityPass?.owner.firstname)

  if (isLoading || isLoadingSecureAccessToken) {
    return <PleaseWait testID="CityPassDashboardPleaseWait" />
  }

  if (isError || !cityPass) {
    return (
      <CityPassFullScreenError
        error={error}
        retryFn={refetch}
      />
    )
  }

  const {budgets} = cityPass
  const budget = budgets.find(b => b.code === budgetCode)

  if (!budget) {
    return (
      <CityPassFullScreenError
        error={error}
        retryFn={refetch}
      />
    )
  }

  const {
    budgetBalanceFormatted,
    budgetAssignedFormatted,
    dateEnd,
    dateEndFormatted,
    title,
  } = budget

  return (
    <ScrollView>
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
          <BudgetTransactions
            budgetCode={budgetCode}
            dateEnd={dateEnd}
            passNumber={passNumber}
          />
        </Column>
      </Box>
    </ScrollView>
  )
}
