import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import type {SessionFieldValues} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {SwitchField} from '@/components/ui/forms/SwitchField'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useZoneByMachineQuery} from '@/modules/parking/service'
import {getParkingMachineDetailsLabel} from '@/modules/parking/utils/paymentZone'

type FieldValues = Pick<
  SessionFieldValues,
  'parking_machine' | 'startTime' | 'parking_machine_favorite'
>

export const ParkingSessionChooseParkingMachine = () => {
  const {clearErrors, control, setError, watch} = useFormContext<FieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const parkingMachine = watch('parking_machine')
  const startTime = watch('startTime')

  const {data: parkingMachineDetails, error} = useZoneByMachineQuery(
    parkingMachine && currentPermit.can_select_zone
      ? {machineId: parkingMachine, report_code: currentPermit.report_code}
      : skipToken,
  )

  useEffect(() => {
    if (!error) {
      clearErrors('parking_machine')

      return
    }

    const {data} = error as {data: {code: string}}

    if (typeof data !== 'object') {
      return
    }

    if ('code' in data && data.code === 'SSP_PARKING_MACHINE_NOT_IN_ZONE') {
      setError('parking_machine', {
        type: 'manual',
        message:
          'Deze parkeerautomaat ligt buiten het vergunninggebied. Kies een andere automaat.',
      })
    }

    if ('code' in data && data.code === 'SSP_NOT_FOUND') {
      setError('parking_machine', {
        type: 'manual',
        message: 'Deze parkeerautomaat bestaat niet. Kies een andere automaat.',
      })
    }
  }, [clearErrors, error, setError])

  if (!currentPermit.can_select_zone) {
    return null
  }

  const machineDetailsLabel = useMemo(
    () => getParkingMachineDetailsLabel(parkingMachineDetails, startTime),
    [parkingMachineDetails, startTime],
  )

  return (
    <Column gutter="md">
      <SelectButtonControlled<{parking_machine: string}, 'parking_machine'>
        bottomSheetVariant={ParkingSessionBottomSheetVariant.parkingMachine}
        iconName="location"
        name="parking_machine"
        rules={{required: 'Kies een parkeerautomaat'}}
        testID="ParkingChooseParkingMachineButton"
        text={parking_machine => parking_machine}
        textAdditional={!error ? machineDetailsLabel : ''}
        title={parking_machine =>
          parking_machine ? 'Parkeerautomaat' : 'Kies parkeerautomaat'
        }
      />
      {currentPermit.parking_machine_favorite !== parkingMachine &&
        !!parkingMachine &&
        !error && (
          <SwitchField
            accessibilityLabel="Stel in als favoriet"
            control={control}
            defaultValue={false}
            label={<Phrase>Opslaan als standaard</Phrase>}
            name="parking_machine_favorite"
            testID="ParkingSessionChooseParkingMachineFavoriteSwitch"
          />
        )}
    </Column>
  )
}
