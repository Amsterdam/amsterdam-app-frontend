import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {alerts} from '@/modules/parking/alerts'
import {ParkingChooseAmountButton} from '@/modules/parking/components/form/ParkingChooseAmountButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/hooks/useParkingAccount'
import {
  useAccountDetailsQuery,
  useSessionReceiptQuery,
} from '@/modules/parking/service'
import {ParkingLicensePlate, ParkingPermitScope} from '@/modules/parking/types'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingReceipt = () => {
  const {
    setValue,
    watch,
    formState: {errors},
  } = useFormContext<{
    amount?: number
    endTime?: Dayjs
    licensePlate?: ParkingLicensePlate
    paymentZoneId?: string
    ps_right_id?: number
    startTime: Dayjs
    visitorVehicleId?: string
  }>()
  const {
    startTime,
    endTime,
    licensePlate,
    paymentZoneId,
    ps_right_id,
    amount = 0,
    visitorVehicleId,
  } = watch()
  const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId ?? '111111'
  const parkingAccount = useParkingAccount()
  const isPermitHolder =
    parkingAccount?.scope === ParkingPermitScope.permitHolder
  const isVisitor = parkingAccount?.scope === ParkingPermitScope.visitor

  const currentPermit = useCurrentParkingPermit()

  const allDataEntered = endTime && paymentZoneId && endTime.isAfter(startTime)

  const {data, isLoading} = useSessionReceiptQuery(
    allDataEntered
      ? {
          report_code: currentPermit.report_code.toString(),
          end_date_time: endTime.toJSON(),
          payment_zone_id: paymentZoneId,
          start_date_time: startTime.toJSON(),
          vehicle_id: vehicleId,
          ps_right_id,
        }
      : skipToken,
  )

  const {data: account, isLoading: isLoadingAccount} = useAccountDetailsQuery()

  useEffect(() => {
    if (isVisitor) {
      setValue('amount', data?.costs?.value)
    }
  }, [isVisitor, data?.costs?.value, setValue])

  if (isLoading || isLoadingAccount) {
    return <PleaseWait testID="ParkingSessionReceiptPleaseWait" />
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
    ? formatNumber(data?.costs.value, data?.costs.currency)
    : '-'

  const remainingTimeBalanceText = formatSecondsTimeRangeToDisplay(
    remaining_time_balance ?? time_balance,
    {
      short: true,
    },
  )
  const remainingMoneyBalanceText = formatNumber(
    remaining_wallet_balance
      ? remaining_wallet_balance.value + amount
      : account?.wallet?.balance,
    remaining_wallet_balance
      ? remaining_wallet_balance.currency
      : account?.wallet?.currency,
  )
  const remainingTimeBalanceError =
    currentPermit.time_balance_applicable && (remaining_time_balance ?? 0) < 0
  const remainingMoneyBalanceError =
    currentPermit.money_balance_applicable &&
    remaining_wallet_balance &&
    remaining_wallet_balance.value + amount < 0

  if (
    !currentPermit.time_balance_applicable &&
    !currentPermit.money_balance_applicable
  ) {
    return null
  }

  return (
    <Column>
      {(!!remainingMoneyBalanceError || (amount > 0 && isPermitHolder)) && (
        <>
          <Title
            level="h2"
            testID="ParkingIncreaseBalanceTitle"
            text="Geldsaldo toevoegen"
          />
          <Gutter height="md" />
          <ParkingChooseAmountButton />
          <Gutter height="lg" />
        </>
      )}
      <Title
        level="h2"
        testID="ParkingCostTitle"
        text="Kosten"
      />
      <Gutter height="sm" />
      {!!currentPermit.time_balance_applicable && (
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase emphasis="strong">Parkeertijd</Phrase>
            <Phrase emphasis="strong">{parkingTimeText}</Phrase>
          </Row>
        </SingleSelectable>
      )}
      {!!currentPermit.money_balance_applicable && (
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase emphasis="strong">Parkeerkosten</Phrase>
            <Phrase emphasis="strong">{parkingCostText}</Phrase>
          </Row>
        </SingleSelectable>
      )}
      <Gutter height="md" />
      {!!currentPermit.time_balance_applicable && (
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase color={remainingTimeBalanceError ? 'warning' : undefined}>
              Resterend tijdsaldo
            </Phrase>
            <Phrase color={remainingTimeBalanceError ? 'warning' : undefined}>
              {`${remainingTimeBalanceError ? '-' : ''} ${remainingTimeBalanceText}`}
            </Phrase>
          </Row>
        </SingleSelectable>
      )}

      {!!currentPermit.money_balance_applicable && !!isPermitHolder && (
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase color={remainingMoneyBalanceError ? 'warning' : undefined}>
              Resterend geldsaldo
            </Phrase>
            <Phrase color={remainingMoneyBalanceError ? 'warning' : undefined}>
              {remainingMoneyBalanceText}
            </Phrase>
          </Row>
        </SingleSelectable>
      )}
      {(!!remainingTimeBalanceError ||
        errors.root?.serverError.message?.includes(
          'Timebalance insufficient',
        )) && (
        <>
          <Gutter height="lg" />
          <AlertNegative
            {...alerts[
              isPermitHolder
                ? 'insufficientTimeBalanceFailed'
                : 'insufficientTimeBalanceVisitorFailed'
            ]}
          />
        </>
      )}
      {(!!remainingMoneyBalanceError ||
        errors.root?.serverError.message === 'SSP_BALANCE_TOO_LOW') && (
        <>
          <Gutter height="lg" />
          <AlertNegative {...alerts.insufficientMoneyBalanceFailed} />
        </>
      )}
      <Gutter height="md" />
    </Column>
  )
}
