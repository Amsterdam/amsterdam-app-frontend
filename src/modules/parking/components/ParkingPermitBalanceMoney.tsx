import {skipToken} from '@reduxjs/toolkit/query'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {convertMillisecondsToHoursAndMinutes} from '@/modules/parking/utils/convertMillisecondsToHoursAndMinutes'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingPermitBalanceMoney = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentPermit()

  const {data: account, isLoading} = useAccountDetailsQuery(
    secureParkingAccount ? secureParkingAccount.accessToken : skipToken,
  )

  if (isLoadingSecureParkingAccount || isLoadingCurrentPermit || isLoading) {
    return <PleaseWait testID="ParkingPermitBalanceMoneyPleaseWait" />
  }

  if (!account || !currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingPermitBalanceMoneySomethingWentWrong" />
    )
  }

  if (!currentPermit.money_balance_applicable) {
    return null
  }

  const {
    wallet: {balance},
  } = account

  const {parking_rate} = currentPermit

  const timeBalanceHoursMinutes = convertMillisecondsToHoursAndMinutes(
    balance / parking_rate.value,
  )

  return (
    <Column gutter="md">
      <Column gutter="xs">
        <Row align="between">
          <Phrase
            emphasis="strong"
            testID="ParkingPermitBalanceMoneyTitlePhrase">
            Geldsaldo
          </Phrase>
          <Phrase
            emphasis="strong"
            testID="ParkingPermitBalanceMoneyTitlePhrase">
            {formatNumber(balance, true)}
          </Phrase>
        </Row>
        <Phrase testID="ParkingPermitBalanceMoneyValidUntilPhrase">
          {`Goed voor ${timeBalanceHoursMinutes[0]} uur en ${timeBalanceHoursMinutes[1]} minuten`}
        </Phrase>
      </Column>
      <Button
        iconName="euroCoins"
        label="Geldsaldo toevoegen"
        testID=""
        variant="secondary"
      />
    </Column>
  )
}
