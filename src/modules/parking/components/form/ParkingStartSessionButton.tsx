import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useStartSessionMutation} from '@/modules/parking/service'
import {useVisitorVehicleId} from '@/modules/parking/slice'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate?: {vehicle_id: string; visitor_name: string}
  paymentZoneId: string
  startTime: Dayjs
  visitorVehicleId?: string
}

export const ParkingStartSessionButton = () => {
  const {handleSubmit} = useFormContext<FieldValues>()
  const currentPermit = useCurrentParkingPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const {setVisitorVehicleId} = useVisitorVehicleId()

  const [startSession] = useStartSessionMutation()

  const {goBack} = useNavigation()
  const openWebUrl = useOpenWebUrl()

  const onSubmit = useCallback(
    ({
      startTime,
      endTime,
      paymentZoneId,
      amount,
      licensePlate,
      visitorVehicleId,
    }: FieldValues) => {
      const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId

      // TODO:
      // check if the limit of current active parking sessions is not reached
      if (secureParkingAccount && vehicleId) {
        void startSession({
          accessToken: secureParkingAccount.accessToken,
          parking_session: {
            report_code: currentPermit.report_code.toString(),
            vehicle_id: vehicleId,
            end_date_time: endTime?.toJSON(),
            start_date_time: startTime.toJSON(),
            payment_zone_id: paymentZoneId,
          },
          ...(amount
            ? {
                balance: {
                  amount,
                  currency: 'EUR',
                },
                redirect: {
                  merchant_return_url:
                    'amsterdam://parking/start-session-and-increase-balance/return',
                },
                locale: 'nl',
              }
            : {}),
        })
          .unwrap()
          .then(result => {
            if (visitorVehicleId) {
              setVisitorVehicleId(visitorVehicleId)
            }

            if (result.redirect_url) {
              openWebUrl(result.redirect_url)
            }

            goBack()
          })
      }
    },
    [
      secureParkingAccount,
      startSession,
      currentPermit.report_code,
      goBack,
      setVisitorVehicleId,
      openWebUrl,
    ],
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
