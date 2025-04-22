import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useStartSessionMutation} from '@/modules/parking/service'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  endTime?: Dayjs
  licensePlate: {vehicle_id: string; visitor_name: string}
  paymentZoneId: string
  startTime: Dayjs
}

export const ParkingStartSessionButton = () => {
  const {handleSubmit} = useFormContext<FieldValues>()
  const {currentPermit} = useGetCurrentParkingPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [startSession] = useStartSessionMutation()

  const {goBack} = useNavigation()

  const onSubmit = useCallback(
    ({startTime, endTime, paymentZoneId, licensePlate}: FieldValues) => {
      // TODO:
      // check if the limit of current active parking sessions is not reached
      if (currentPermit && secureParkingAccount && licensePlate?.vehicle_id) {
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
          .then(() => {
            goBack()
          })
      }
    },
    [currentPermit, secureParkingAccount, startSession, goBack],
  )

  return (
    <Button
      iconName="parkingSession"
      label="Bevestig parkeersessie"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingStartSessionButton"
      variant="primary"
    />
  )
}
