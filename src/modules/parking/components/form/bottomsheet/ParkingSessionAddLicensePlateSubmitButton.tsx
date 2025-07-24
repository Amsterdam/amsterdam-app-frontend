import {useBottomSheet} from '@gorhom/bottom-sheet'
import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {AlertWarning} from '@/components/ui/feedback/alert/AlertWarning'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useAddLicensePlateMutation} from '@/modules/parking/service'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  setLicensePlate: (licensePlate: ParkingLicensePlate) => void
}

export const ParkingSessionAddLicensePlateSubmitButton = ({
  setLicensePlate,
}: Props) => {
  const {close} = useBottomSheet()
  const {
    clearErrors,
    handleSubmit,
    reset,
    setError,
    formState: {errors},
    watch,
  } = useFormContext<ParkingLicensePlate>()
  const currentPermit = useCurrentParkingPermit()
  const [addLicensePlate] = useAddLicensePlateMutation()
  const {licensePlates} = useGetLicensePlates()
  const vehicleIdInput = watch('vehicle_id')

  const onSubmit = handleSubmit((licensePlate: ParkingLicensePlate) => {
    if (errors.root?.localError?.type === 'isLicensePlateDuplicate') {
      return
    }

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

  useEffect(() => {
    if (licensePlates?.some(lp => lp.vehicle_id === vehicleIdInput)) {
      setError('root.localError', {
        type: 'isLicensePlateDuplicate',
      })
    } else {
      clearErrors('root.localError')
    }
  }, [clearErrors, licensePlates, setError, vehicleIdInput])

  return (
    <>
      {errors.root?.localError?.type === 'isLicensePlateDuplicate' && (
        <>
          <AlertWarning
            testID="ParkingSessionAddLicensePlateDuplicateAlert"
            text="Dit kenteken is al opgeslagen in Mijn kentekens."
            title="Kenteken bestaat al"
          />
        </>
      )}
      <Button
        label="Gereed"
        onPress={onSubmit}
        testID="ParkingSessionAddLicensePlateSubmitButton"
        variant="secondary"
      />
    </>
  )
}
