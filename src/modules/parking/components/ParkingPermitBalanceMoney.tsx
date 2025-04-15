import {skipToken} from '@reduxjs/toolkit/query'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {getParkingTimeForMoneyBalance} from '@/modules/parking/utils/getParkingTimeForMoneyBalance'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingPermitBalanceMoney = () => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const {currentPermit, isLoading: isLoadingCurrentPermit} =
    useGetCurrentParkingPermit()

  const {data: account, isLoading} = useAccountDetailsQuery(
    secureParkingAccount ? secureParkingAccount.accessToken : skipToken,
  )
  const {navigate} = useNavigation()

  const onPressAddMoney = () => {
    navigate(ParkingRouteName.increaseBalance)
  }

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
    wallet: {balance, currency},
  } = account

  return (
    <Column gutter="md">
      <Column gutter="xs">
        <Row align="between">
          <Title
            level="h5"
            testID="ParkingPermitBalanceMoneyTitlePhrase"
            text="Geldsaldo"
          />
          <Title
            level="h5"
            testID="ParkingPermitBalanceMoneyTitlePhrase"
            text={formatNumber(balance, currency)}
          />
        </Row>
        <Phrase testID="ParkingPermitBalanceMoneyValidUntilPhrase">
          Goed voor{' '}
          {getParkingTimeForMoneyBalance(
            balance,
            currentPermit.parking_rate.value,
          )}
        </Phrase>
      </Column>
      <Button
        iconName="euroCoins"
        label="Geldsaldo toevoegen"
        onPress={onPressAddMoney}
        testID="ParkingPermitBalanceMoneyAddButton"
        variant="secondary"
      />
    </Column>
  )
}
