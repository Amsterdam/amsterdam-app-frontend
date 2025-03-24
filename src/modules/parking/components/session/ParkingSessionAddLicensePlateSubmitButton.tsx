import {useBottomSheet} from '@gorhom/bottom-sheet'
import {useContext} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useAddLicensePlateMutation} from '@/modules/parking/service'
import {ParkingLicensePlate} from '@/modules/parking/types'

export const ParkingSessionAddLicensePlateSubmitButton = () => {
  const {close} = useBottomSheet()
  const {handleSubmit, reset} = useFormContext<ParkingLicensePlate>()
  const {addLicensePlate: addLicensePlateToContext} = useContext(
    ParkingSessionContext,
  )
  const {currentPermit} = useGetCurrentParkingPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()
  const [addLicensePlate] = useAddLicensePlateMutation()

  const onSubmit = handleSubmit((licensePlate: ParkingLicensePlate) => {
    const {vehicle_id, visitor_name} = licensePlate

    if (!currentPermit || !secureParkingAccount) {
      return
    }

    if (visitor_name) {
      void addLicensePlate({
        accessToken: secureParkingAccount.accessToken,
        report_code: currentPermit.report_code.toString(),
        vehicle_id,
        visitor_name,
      })
        .unwrap()
        .then(result => {
          addLicensePlateToContext({
            vehicle_id: result.vehicle_id,
            visitor_name: result.visitor_name,
          })
          close()
        })
    } else {
      addLicensePlateToContext({vehicle_id: vehicle_id.toUpperCase()})
      close()
    }

    reset()
  })

  return (
    <Button
      label="Gereed"
      onPress={onSubmit}
      testID="ParkingSessionAddLicensePlateSubmitButton"
      variant="secondary"
    />
  )
}
