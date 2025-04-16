import {useCallback, useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingSessionContext} from '@/modules/parking/components/form/ParkingSessionProvider'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useStartSessionMutation} from '@/modules/parking/service'
import {devLog} from '@/processes/development'

export const ParkingStartSessionButton = () => {
  const {startTime, endTime, paymentZoneId, licensePlate} = useContext(
    ParkingSessionContext,
  )
  const {currentPermit} = useGetCurrentParkingPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [startSession] = useStartSessionMutation()

  const {goBack} = useNavigation()

  const onSubmit = useCallback(() => {
    // TODO:
    // check if the limit of current active parking sessions is not reached
    if (
      currentPermit &&
      secureParkingAccount &&
      startTime &&
      (currentPermit.no_endtime || endTime) &&
      (currentPermit.no_endtime || startTime.isBefore(endTime)) &&
      paymentZoneId &&
      licensePlate?.vehicle_id
    ) {
      void startSession({
        accessToken: secureParkingAccount.accessToken,
        parking_session: {
          report_code: currentPermit.report_code.toString(),
          vehicle_id: licensePlate.vehicle_id,
          end_date_time: endTime?.toJSON(),
          start_date_time: startTime.toJSON(),
          payment_zone_id: paymentZoneId,
        },
      })
        .unwrap()
        .then(result => {
          // Handle successful session creation
          devLog('Session created successfully:', result)
          goBack()
        })
    }
  }, [
    currentPermit,
    secureParkingAccount,
    startTime,
    endTime,
    paymentZoneId,
    licensePlate?.vehicle_id,
    startSession,
    goBack,
  ])

  return (
    <Button
      iconName="parkingSession"
      label="Bevestig parkeersessie"
      onPress={onSubmit}
      testID="ParkingStartSessionButton"
      variant="primary"
    />
  )
}
