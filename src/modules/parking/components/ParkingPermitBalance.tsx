import {skipToken} from '@reduxjs/toolkit/query'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermitBalanceMoney} from '@/modules/parking/components/ParkingPermitBalanceMoney'
import {ParkingPermitBalanceTime} from '@/modules/parking/components/ParkingPermitBalanceTime'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useAccountDetailsQuery} from '@/modules/parking/service'

export const ParkingPermitBalance = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {currentPermit} = useGetCurrentPermit()

  const {data, isLoading} = useAccountDetailsQuery(
    secureParkingAccount ? secureParkingAccount.accessToken : skipToken,
  )

  if (
    !currentPermit ||
    (!currentPermit.time_balance_applicable &&
      !currentPermit.money_balance_applicable)
  ) {
    return null
  }

  if (isLoadingSecureParkingAccount || isLoading) {
    return <PleaseWait testID="ParkingPermitBalancePleaseWait" />
  }

  if (!data) {
    return (
      <SomethingWentWrong testID="ParkingPermitBalanceSomethingWentWrong" />
    )
  }

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text="Uw saldo"
      />
      <ParkingPermitBalanceTime />
      <ParkingPermitBalanceMoney />
    </Column>
  )
}
