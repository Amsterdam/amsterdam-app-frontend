import {skipToken} from '@reduxjs/toolkit/query'
import {useContext} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {
  useAccountDetailsQuery,
  useSessionReceiptQuery,
} from '@/modules/parking/service'
import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingReceipt = () => {
  const {startTime, endTime, licensePlate, paymentZoneId} = useContext(
    ParkingSessionContext,
  )

  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()

  const allDataEntered =
    endTime && paymentZoneId && licensePlate && endTime.isAfter(startTime)

  const {data, isLoading} = useSessionReceiptQuery(
    secureParkingAccount && allDataEntered
      ? {
          accessToken: secureParkingAccount.accessToken,
          report_code: secureParkingAccount.reportCode,
          end_date: endTime.toJSON(),
          payment_zone_id: paymentZoneId,
          start_date: startTime.toJSON(),
          vehicle_id: licensePlate?.vehicle_id,
        }
      : skipToken,
  )

  const {data: account, isLoading: isLoadingAccount} = useAccountDetailsQuery(
    secureParkingAccount ? secureParkingAccount.accessToken : skipToken,
  )

  const {currentPermit, isLoading: isLoadingPermit} =
    useGetCurrentParkingPermit()

  if (
    isLoading ||
    isLoadingPermit ||
    isLoadingSecureParkingAccount ||
    isLoadingAccount
  ) {
    return <PleaseWait testID="ParkingSessionReceiptPleaseWait" />
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionReceiptSomethingWentWrong" />
    )
  }

  const {
    remaining_wallet_balance,
    remaining_time_balance,
    parking_time,
    parking_cost,
  } = data ?? {}
  const {time_balance} = currentPermit

  const parkingTimeText = parking_time
    ? formatSecondsTimeRangeToDisplay(data?.parking_time, {
        short: true,
      })
    : '-'
  const parkingCostText = parking_cost
    ? formatNumber(data?.parking_cost.value, data?.parking_cost.currency)
    : '-'
  const remainingTimeBalanceText = formatSecondsTimeRangeToDisplay(
    remaining_time_balance ?? time_balance,
    {
      short: true,
    },
  )
  const remainingMoneyBalanceText = formatNumber(
    remaining_time_balance
      ? remaining_wallet_balance?.value
      : account?.wallet.balance,
    remaining_time_balance
      ? remaining_wallet_balance?.currency
      : account?.wallet.currency,
  )

  if (
    !currentPermit.time_balance_applicable &&
    !currentPermit.money_balance_applicable
  ) {
    return null
  }

  return (
    <Column>
      <Title
        level="h2"
        testID="ParkingCostTitle"
        text="Kosten"
      />
      <Gutter height="sm" />
      {!!currentPermit.time_balance_applicable && (
        <Row
          align="between"
          flex={1}>
          <Phrase emphasis="strong">Parkeertijd</Phrase>
          <Phrase emphasis="strong">{parkingTimeText}</Phrase>
        </Row>
      )}
      {!!currentPermit.money_balance_applicable && (
        <Row
          align="between"
          flex={1}>
          <Phrase emphasis="strong">Parkeerkosten</Phrase>
          <Phrase emphasis="strong">{parkingCostText}</Phrase>
        </Row>
      )}
      <Gutter height="md" />
      {!!currentPermit.time_balance_applicable && (
        <Row
          align="between"
          flex={1}>
          <Phrase>Resterend tijdsaldo</Phrase>
          <Phrase>{remainingTimeBalanceText}</Phrase>
        </Row>
      )}

      {!!currentPermit.money_balance_applicable && (
        <Row
          align="between"
          flex={1}>
          <Phrase>Resterend geldsaldo</Phrase>
          <Phrase>{remainingMoneyBalanceText}</Phrase>
        </Row>
      )}
      <Gutter height="md" />
    </Column>
  )
}
