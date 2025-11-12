import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import type {SessionFieldValues} from '@/modules/parking/components/form/ParkingStartSessionButton'
import type {ParkingMachine} from '@/modules/parking/types'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {SwitchField} from '@/components/ui/forms/SwitchField'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useZoneByMachineQuery} from '@/modules/parking/service'
import {getParkingMachineDetailsLabel} from '@/modules/parking/utils/paymentZone'

type FieldValues = Pick<
  SessionFieldValues,
  'parking_machine' | 'startTime' | 'parking_machine_favorite'
>

export const ParkingSessionChooseParkingMachine = ({
  selectedParkingMachineId,
}: {
  selectedParkingMachineId?: ParkingMachine['id']
}) => {
  const {
    clearErrors,
    control,
    setError,
    watch,
    setValue,
    formState: {errors},
  } = useFormContext<FieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const parkingMachine = watch('parking_machine')
  const startTime = watch('startTime')
  const navigation = useNavigation<ParkingRouteName>()

  const {data: parkingMachineDetails, error} = useZoneByMachineQuery(
    parkingMachine && currentPermit.can_select_zone
      ? {machineId: parkingMachine, report_code: currentPermit.report_code}
      : skipToken,
  )

  useEffect(() => {
    if (selectedParkingMachineId) {
      setValue('parking_machine', selectedParkingMachineId)
    }
  }, [setValue, selectedParkingMachineId])

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

  const machineDetailsLabel = useMemo(
    () => getParkingMachineDetailsLabel(parkingMachineDetails, startTime),
    [parkingMachineDetails, startTime],
  )

  useAccessibilityAnnounceEffect(errors.parking_machine?.message)

  if (!currentPermit.can_select_zone) {
    return null
  }

  return (
    <Column gutter="md">
      <Column gutter="md">
        <TopTaskButton
          accessibilityHint="Tik om een parkeerautomaat te kiezen op de map of uit de lijst"
          accessibilityRole="link"
          border
          iconName="location"
          iconRightName="chevron-right"
          iconRightSize="lg"
          onPress={() => {
            navigation.navigate(ParkingRouteName.parkingPermitZones)
          }}
          testID="ParkingNavigateToPermitZoneMapButton"
          text={parkingMachine}
          textAdditional={machineDetailsLabel}
          title={parkingMachine ? 'Parkeerautomaat' : 'Kies parkeerautomaat'}
        />
        {!!error && (
          <ErrorMessage
            testID="ParkingNavigateToPermitZoneMapButtonErrorText"
            text={errors.parking_machine?.message ?? ''}
          />
        )}
      </Column>
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
