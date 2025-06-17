import {useEffect} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {
  setWalletBalanceIncreaseStartedAt,
  useWalletBalanceIncreaseStartedAt,
  useWalletBalanceIncreaseStartBalance,
} from '@/modules/parking/slice'
import {getParkingTimeForMoneyBalance} from '@/modules/parking/utils/getParkingTimeForMoneyBalance'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingPermitBalanceMoney = () => {
  const dispatch = useDispatch()
  const currentPermit = useCurrentParkingPermit()
  const walletBalance = useWalletBalanceIncreaseStartBalance()
  const {data: account, isLoading, refetch} = useAccountDetailsQuery()
  const accountWalletBalance = account?.wallet?.balance
  const {navigate} = useNavigation()
  const walletBalanceIncreaseStartedAt = useWalletBalanceIncreaseStartedAt()

  const onPressAddMoney = () => {
    navigate(ParkingRouteName.increaseBalance)
  }

  useEffect(() => {
    if (
      walletBalance &&
      accountWalletBalance &&
      accountWalletBalance > walletBalance
    ) {
      dispatch(setWalletBalanceIncreaseStartedAt(undefined))
    }
  }, [dispatch, walletBalance, accountWalletBalance])

  // refetch account details every 5 seconds if the wallet balance hasn't updated yet, it can take a bit before the payment is processed
  useRefetchInterval(
    refetch,
    walletBalanceIncreaseStartedAt &&
      dayjs().diff(walletBalanceIncreaseStartedAt, 'minutes') < 15 &&
      typeof walletBalance === 'number' &&
      walletBalance === accountWalletBalance
      ? 5000
      : 0,
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitBalanceMoneyPleaseWait" />
  }

  if (!account) {
    return (
      <SomethingWentWrong testID="ParkingPermitBalanceMoneySomethingWentWrong" />
    )
  }

  if (!currentPermit.money_balance_applicable || !account.wallet) {
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
