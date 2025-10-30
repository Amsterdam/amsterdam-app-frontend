import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {alerts} from '@/modules/parking/alerts'
import {ParkingChooseAmountButton} from '@/modules/parking/components/form/ParkingChooseAmountButton'
import {ParkingReceiptItem} from '@/modules/parking/components/form/ParkingReceiptItem'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetRemainingBalance} from '@/modules/parking/hooks/useGetRemainingBalance'
import {
  useAccountDetailsQuery,
  useSessionReceiptQuery,
} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingApiVersion,
  ParkingLicensePlate,
  ParkingPermitScope,
} from '@/modules/parking/types'
import {useBottomSheetSelectors} from '@/store/slices/bottomSheet'
import {Dayjs} from '@/utils/datetime/dayjs'
import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingReceipt = () => {
  const {
    setError,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext<{
    amount?: number
    endTime?: Dayjs
    licensePlate?: ParkingLicensePlate
    parking_machine?: string
    paymentZoneId?: string
    ps_right_id?: number
    startTime: Dayjs
    visitorVehicleId?: string
  }>()
  const {
    startTime,
    endTime,
    licensePlate,
    parking_machine,
    paymentZoneId,
    ps_right_id,
    amount = 0,
    visitorVehicleId,
  } = watch()

  const apiVersion = useCurrentParkingApiVersion()
  const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId ?? '111111'
  const parkingAccount = useParkingAccount()
  const isPermitHolder =
    parkingAccount?.scope === ParkingPermitScope.permitHolder
  const isVisitor = parkingAccount?.scope === ParkingPermitScope.visitor

  const currentPermit = useCurrentParkingPermit()
  const {isOpen} = useBottomSheetSelectors()
  const allDataEntered =
    endTime && (paymentZoneId || parking_machine) && endTime.isAfter(startTime)

  const {data, isLoading} = useSessionReceiptQuery(
    allDataEntered && !isOpen
      ? {
          report_code: currentPermit.report_code.toString(),
          end_date_time: endTime.toJSON(),
          parking_machine,
          payment_zone_id: paymentZoneId,
          start_date_time: startTime.toJSON(),
          vehicle_id: vehicleId,
          ps_right_id,
        }
      : skipToken,
  )
  const {data: account, isLoading: isLoadingAccount} = useAccountDetailsQuery()

  const {remainingTimeBalance, remainingWalletBalance} = useGetRemainingBalance(
    startTime,
    endTime,
    parking_machine,
    paymentZoneId,
    data?.costs.value,
  )

  const {parking_time, parking_cost} = data ?? {}

  const parkingTimeText = parking_time
    ? formatSecondsTimeRangeToDisplay(data?.parking_time, {
        short: true,
      })
    : '-'
  const parkingCostText = parking_cost
    ? formatNumber(data?.costs.value, data?.costs.currency)
    : '-'

  const remainingTimeBalanceText = formatSecondsTimeRangeToDisplay(
    remainingTimeBalance,
    {
      short: true,
    },
  )

  const remainingWalletBalanceText =
    typeof account?.wallet?.balance === 'number'
      ? formatNumber(remainingWalletBalance, 'EUR')
      : '-'

  const remainingTimeBalanceError =
    currentPermit.time_balance_applicable &&
    remainingTimeBalance &&
    remainingTimeBalance < 0

  const remainingWalletBalanceError =
    isPermitHolder &&
    currentPermit.money_balance_applicable &&
    remainingWalletBalance &&
    remainingWalletBalance < 0

  useEffect(() => {
    if (remainingTimeBalanceError) {
      setError('root.localError', {
        type: 'isTimeBalanceInsufficient',
      })
    }
  }, [remainingTimeBalanceError, setError])

  useEffect(() => {
    if (remainingWalletBalanceError) {
      setError('root.localError', {
        type: 'isWalletBalanceInsufficient',
      })
    }
  }, [remainingWalletBalanceError, setError])

  useEffect(() => {
    if (isVisitor) {
      setValue('amount', data?.costs?.value)
    }
  }, [isVisitor, data?.costs?.value, setValue])

  if (isLoading || isLoadingAccount) {
    return <PleaseWait testID="ParkingSessionReceiptPleaseWait" />
  }

  if (
    !currentPermit.time_balance_applicable &&
    !currentPermit.money_balance_applicable
  ) {
    return null
  }

  return (
    <Column gutter="lg">
      <Column gutter="md">
        {(!!remainingWalletBalanceError || (amount > 0 && isPermitHolder)) && (
          <>
            <Title
              level="h2"
              testID="ParkingIncreaseBalanceTitle"
              text="Geldsaldo toevoegen"
            />
            <ParkingChooseAmountButton />
            <Gutter height="sm" />
          </>
        )}
        <Title
          level="h2"
          testID="ParkingCostTitle"
          text="Kosten"
        />
        <Column gutter="xs">
          {!!currentPermit.time_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase emphasis="strong">Parkeertijd</Phrase>
              <Phrase emphasis="strong">{parkingTimeText}</Phrase>
            </ParkingReceiptItem>
          )}
          {!!currentPermit.money_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase emphasis="strong">Parkeerkosten</Phrase>
              <Phrase emphasis="strong">{parkingCostText}</Phrase>
            </ParkingReceiptItem>
          )}
        </Column>
        <Column gutter="xs">
          {!!currentPermit.time_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase color={remainingTimeBalanceError ? 'warning' : undefined}>
                Resterend tijdsaldo
              </Phrase>
              <Phrase color={remainingTimeBalanceError ? 'warning' : undefined}>
                {`${remainingTimeBalanceError ? '-' : ''} ${remainingTimeBalanceText}`}
              </Phrase>
            </ParkingReceiptItem>
          )}

          {!!currentPermit.money_balance_applicable && !!isPermitHolder && (
            <ParkingReceiptItem>
              <Phrase
                color={remainingWalletBalanceError ? 'warning' : undefined}>
                Resterend geldsaldo
              </Phrase>
              <Phrase
                color={remainingWalletBalanceError ? 'warning' : undefined}>
                {remainingWalletBalanceText}
              </Phrase>
            </ParkingReceiptItem>
          )}
        </Column>
      </Column>
      {!!remainingTimeBalanceError ||
        (errors.root?.serverError?.message?.includes(
          'Timebalance insufficient',
        ) && (
          <AlertNegative
            {...alerts[
              isPermitHolder
                ? 'insufficientTimeBalanceFailed'
                : 'insufficientTimeBalanceVisitorFailed'
            ]}
          />
        ))}
      {(!!remainingWalletBalanceError ||
        errors.root?.serverError?.message === 'SSP_BALANCE_TOO_LOW') && (
        <AlertNegative
          {...(apiVersion === ParkingApiVersion.v1
            ? alerts.insufficientMoneyBalanceFailed
            : alerts.insufficientMoneyBalance2Failed)}
        />
      )}
    </Column>
  )
}
