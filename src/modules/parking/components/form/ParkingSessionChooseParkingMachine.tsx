import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import type {Dayjs} from 'dayjs'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useZoneByMachineQuery} from '@/modules/parking/service'
import {
  getPaymentZoneDay,
  getPaymentZoneDayTimeSpan,
} from '@/modules/parking/utils/paymentZone'

type FieldValues = {
  parking_machine?: string
  startTime: Dayjs
}

export const ParkingSessionChooseParkingMachine = () => {
  const {clearErrors, setError, watch} = useFormContext<FieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const parkingMachine = watch('parking_machine')
  const startTime = watch('startTime')

  const {data: parkingMachineDetails, error} = useZoneByMachineQuery(
    parkingMachine && currentPermit.can_select_zone
      ? {machineId: parkingMachine, permitId: currentPermit.report_code}
      : skipToken,
  )

  useEffect(() => {
    if (!error) {
      clearErrors('parking_machine')

      return
    }

    const {data} = error as {data: {code: string}}

    if ('code' in data && data.code === 'SSP_PARKING_MACHINE_NOT_IN_ZONE') {
      setError('parking_machine', {
        type: 'manual',
        message:
          'Deze parkeerautomaat ligt buiten het vergunninggebied. Kies een andere automaat.',
      })
    }
  }, [clearErrors, error, setError])

  const startTimeDayOfWeek = startTime.day()

  const startTimePaymentZoneDay = parkingMachineDetails
    ? getPaymentZoneDay(parkingMachineDetails, startTimeDayOfWeek)
    : undefined

  const timeString = startTimePaymentZoneDay
    ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
    : undefined

  if (!currentPermit.can_select_zone) {
    return null
  }

  return (
    <SelectButtonControlled<{parking_machine: string}, 'parking_machine'>
      bottomSheetVariant={ParkingSessionBottomSheetVariant.parkingMachine}
      iconName="location"
      name="parking_machine"
      rules={{required: 'Kies een parkeerautomaat'}}
      testID="ParkingChooseParkingMachineButton"
      text={parking_machine => parking_machine}
      textAdditional={!error ? timeString : ''}
      title={parking_machine =>
        parking_machine ? 'Parkeerautomaat' : 'Kies parkeerautomaat'
      }
    />
  )
}
