import {skipToken} from '@reduxjs/toolkit/query'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {BudgetBalanceButton} from '@/modules/city-pass/components/BudgetBalanceButton'
import {DiscountTransactions} from '@/modules/city-pass/components/DiscountTransactions'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {CityPassDetailsInfo} from '@/modules/city-pass/components/details/CityPassDetailsInfo'
import {CityPassDetailsName} from '@/modules/city-pass/components/details/CityPassDetailsName'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {CityPass} from '@/modules/city-pass/types'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  passNumber: CityPass['passNumber']
}

export const CityPassDetails = ({passNumber}: Props) => {
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

  return (
    <Box grow>
      <Column gutter="lg">
        {!!cityPass && <CityPassDetailsName cityPass={cityPass} />}
        <ShowCityPassButton index={cityPassIndex} />
        {!cityPass || isError ? (
          <SomethingWentWrong
            testID="CityPassDetailsSomethingWentWrong"
            text={SOMETHING_WENT_WRONG_TEXT}
            title=""
          />
        ) : (
          <Column gutter="xl">
            <Column gutter="lg">
              <CityPassDetailsInfo cityPass={cityPass} />
              {cityPass.budgets?.map(budget => (
                <BudgetBalanceButton
                  budget={budget}
                  key={budget.code}
                  passNumber={passNumber}
                />
              ))}
            </Column>
            <DiscountTransactions
              dateEnd={cityPass.dateEnd}
              passNumber={passNumber}
            />
          </Column>
        )}
      </Column>
    </Box>
  )
}
