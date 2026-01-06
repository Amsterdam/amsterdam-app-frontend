import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useAddLicensePlateMutation} from '@/modules/parking/service'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'

export const AddLicensePlateForm = () => {
  const navigation = useNavigation()
  const form = useForm<ParkingLicensePlate>()
  const {handleSubmit, formState} = form
  const currentPermit = useCurrentParkingPermit()
  const {licensePlates} = useGetLicensePlates()
  const {setAlert} = useAlert()

  const [addLicensePlate, {isLoading}] = useAddLicensePlateMutation()

  const saveLicensePlate = useCallback(
    (vehicle_id: string, visitor_name: string) => {
      if (licensePlates?.some(lp => lp.vehicle_id === vehicle_id)) {
        setAlert(alerts.saveLicensePlateDuplicateWarning)

        return
      }

      void addLicensePlate({
        report_code: currentPermit.report_code.toString(),
        vehicle_id,
        visitor_name,
      })
        .unwrap()
        .then(() => {
          navigation.popTo(ParkingRouteName.myLicensePlates)
        })
    },
    [
      addLicensePlate,
      currentPermit.report_code,
      licensePlates,
      navigation,
      setAlert,
    ],
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
          hasClearButton={false}
          label="Naam"
          name="visitor_name"
          rules={{
            required: 'Vul een naam in',
            maxLength: {
              value: 50,
              message: 'De ingevoerde naam is te lang',
            },
          }}
          testID="ParkingAddLicensePlateFormNameInputField"
        />
        <Button
          isLoading={formState.isSubmitting || isLoading}
          label="Opslaan"
          onPress={handleSubmit(onSubmit)}
          testID="ParkingAddLicensePlateFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
