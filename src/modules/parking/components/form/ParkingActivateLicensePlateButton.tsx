import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {useActivateSessionMutation} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate?: {vehicle_id: string; visitor_name: string}
  paymentZoneId: string
  startTime: Dayjs
  vehicle_id?: string
}

export const ParkingActivateLicensePlateButton = () => {
  const {goBack} = useNavigation()
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const currentPermit = useCurrentParkingPermit()
  const {setAlert} = useAlert()

  const {parkingSessions} = useGetParkingSessions(ParkingSessionStatus.active)
  const [activateSession, {isLoading}] = useActivateSessionMutation()

  const {
    handleSubmit,
    formState: {isSubmitting},
    setError,
  } = useFormContext<FieldValues>()

  const {report_code} = currentPermit

  const onSubmit = useCallback(
    ({licensePlate}: FieldValues) => {
      if (licensePlate?.vehicle_id === parkingSessions?.[0].vehicle_id) {
        Alert.alert(
          'Dit kenteken is al actief',
          'Kies een ander kenteken uit de lijst.',
        )

        return
      }

      if (licensePlate?.vehicle_id) {
        return activateSession({
          report_code: report_code.toString(),
          vehicle_id: licensePlate?.vehicle_id,
        })
          .unwrap()
          .then(
            () => {
              setAlert(alerts.startSessionSuccess)
              void registerDeviceIfPermitted(true)
              goBack()
            },
            (error: {
              data?: {code?: string; detail?: string}
              status?: string
            }) => {
              setError('root.serverError', {
                type: error?.status,
                message: error.data?.code,
              })
            },
          )
      }
    },
    [
      activateSession,
      report_code,
      parkingSessions,
      registerDeviceIfPermitted,
      goBack,
      setAlert,
      setError,
    ],
  )

  return (
    <Button
      disabled={isSubmitting || isLoading}
      iconName="parkingSession"
      isLoading={isLoading}
      label="Activeer kenteken"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingActivateLicensePlate${currentPermit.permit_type}Button`}
      variant="primary"
    />
  )
}
