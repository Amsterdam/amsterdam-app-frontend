import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Alert} from 'react-native'
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
  const {handleSubmit, formState} = form
  const currentPermit = useCurrentParkingPermit()

  const [addLicensePlate] = useAddLicensePlateMutation()

  const saveLicensePlate = useCallback(
    (vehicle_id: string, visitor_name: string) =>
      addLicensePlate({
        report_code: currentPermit.report_code.toString(),
        vehicle_id,
        visitor_name,
      })
        .unwrap()
        .then(() => {
          navigate(ParkingRouteName.myLicensePlates)
        }),
    [addLicensePlate, currentPermit.report_code, navigate],
  )

  const onSubmit = ({vehicle_id, visitor_name = ''}: ParkingLicensePlate) => {
    // check if vehicle_id has no digits in string
    if (!/\d/.test(vehicle_id)) {
      Alert.alert(
        'Weet u zeker dat dit een geldig kenteken is?',
        `Kenteken: ${vehicle_id}`,
        [
          {text: 'Terug'},
          {
            isPreferred: true,
            text: 'Opslaan',
            onPress: () => saveLicensePlate(vehicle_id, visitor_name),
          },
        ],
      )
    } else {
      return saveLicensePlate(vehicle_id, visitor_name)
    }
  }

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <ParkingVehicleIdTextInput
          autoFocus
          inputInstructions="Voer alleen letters en cijfers in."
          label="Kenteken"
          testID="ParkingAddLicensePlateFormLicensePlateInputField"
        />
        <TextInputField
          label="Naam"
          name="visitor_name"
          rules={{
            required: 'Vul een naam in',
          }}
          testID="ParkingAddLicensePlateFormNameInputField"
        />
        <Button
          disabled={formState.isSubmitting}
          label="Opslaan"
          onPress={handleSubmit(onSubmit)}
          testID="ParkingAddLicensePlateFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
