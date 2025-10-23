import {skipToken} from '@reduxjs/toolkit/query'
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
  const {watch} = useFormContext<FieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const parkingMachine = watch('parking_machine')
  const startTime = watch('startTime')

  const {data: parkingMachineDetails} = useZoneByMachineQuery(
    parkingMachine
      ? {machineId: parkingMachine, permitId: currentPermit.report_code}
      : skipToken,
  )
  const startTimeDayOfWeek = startTime.day()

  const startTimePaymentZoneDay = parkingMachineDetails
    ? getPaymentZoneDay(parkingMachineDetails, startTimeDayOfWeek)
    : undefined

  const timeString = startTimePaymentZoneDay
    ? getPaymentZoneDayTimeSpan(startTimePaymentZoneDay)
    : undefined

  return (
    <SelectButtonControlled<{parking_machine: string}, 'parking_machine'>
      bottomSheetVariant={ParkingSessionBottomSheetVariant.parkingMachine}
      iconName="location"
      name="parking_machine"
      rules={{required: 'Kies een parkeerautomaat'}}
      testID="ParkingChooseParkingMachineButton"
      text={parking_machine => parking_machine}
      textAdditional={timeString}
      title={parking_machine =>
        parking_machine ? 'Parkeerautomaat' : 'Kies parkeerautomaat'
      }
    />
  )
}
