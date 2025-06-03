import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useAddLicensePlateMutation} from '@/modules/parking/service'
import {ParkingLicensePlate} from '@/modules/parking/types'

export const AddLicensePlateForm = () => {
  const {navigate} = useNavigation()
  const form = useForm<ParkingLicensePlate>()
  const {handleSubmit} = form
  const currentPermit = useCurrentParkingPermit()

  const [addLicensePlate] = useAddLicensePlateMutation()

  const onSubmit = ({vehicle_id, visitor_name = ''}: ParkingLicensePlate) => {
    void addLicensePlate({
      report_code: currentPermit.report_code.toString(),
      vehicle_id,
      visitor_name,
    })
      .unwrap()
      .then(() => {
        navigate(ParkingRouteName.myLicensePlates)
      })
  }

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <TextInputField
          autoFocus
          label="Naam"
          name="visitor_name"
          rules={{
            required: 'Vul een naam in',
          }}
          testID="ParkingAddLicensePlateFormNameInputField"
        />
        <ParkingVehicleIdTextInput
          inputInstructions="Voer alleen letters en cijfers in."
          label="Kenteken"
          testID="ParkingAddLicensePlateFormLicensePlateInputField"
        />
        <Button
          isLoading
          label="Opslaan"
          onPress={handleSubmit(onSubmit)}
          testID="ParkingAddLicensePlateFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
