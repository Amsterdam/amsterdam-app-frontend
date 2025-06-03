import {useBottomSheet} from '@gorhom/bottom-sheet'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useAddLicensePlateMutation} from '@/modules/parking/service'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  setLicensePlate: (licensePlate: ParkingLicensePlate) => void
}

export const ParkingSessionAddLicensePlateSubmitButton = ({
  setLicensePlate,
}: Props) => {
  const {close} = useBottomSheet()
  const {handleSubmit, reset} = useFormContext<ParkingLicensePlate>()
  const currentPermit = useCurrentParkingPermit()
  const [addLicensePlate] = useAddLicensePlateMutation()

  const onSubmit = handleSubmit((licensePlate: ParkingLicensePlate) => {
    const {vehicle_id, visitor_name} = licensePlate

    if (visitor_name) {
      void addLicensePlate({
        report_code: currentPermit.report_code.toString(),
        vehicle_id,
        visitor_name,
      })
        .unwrap()
        .then(result => {
          setLicensePlate({
            vehicle_id: result.vehicle_id,
            visitor_name: result.visitor_name,
          })
          close()
        })
    } else {
      setLicensePlate({vehicle_id: vehicle_id.toUpperCase()})
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
