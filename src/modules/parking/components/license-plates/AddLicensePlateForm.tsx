import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetCurrentPermit} from '@/modules/parking/hooks/useGetCurrentPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useAddLicensePlateMutation} from '@/modules/parking/service'
import {ParkingLicensePlate} from '@/modules/parking/types'

export const AddLicensePlateForm = () => {
  const {navigate} = useNavigation()
  const form = useForm<ParkingLicensePlate>()
  const {handleSubmit} = form
  const {currentPermit} = useGetCurrentPermit()
  const {secureParkingAccount} = useGetSecureParkingAccount()

  const [addLicensePlate] = useAddLicensePlateMutation()

  const onSubmit = ({vehicle_id, visitor_name = ''}: ParkingLicensePlate) => {
    if (!currentPermit || !secureParkingAccount) {
      return
    }

    void addLicensePlate({
      accessToken: secureParkingAccount.accessToken,
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
        <TextInputField
          inputInstructions="Vul alleen cijfers en letters in."
          label="Kenteken"
          name="vehicle_id"
          rules={{
            required: 'Vul een kenteken in',
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: 'Alleen cijfers en letters zijn toegestaan',
            },
          }}
          testID="ParkingAddLicensePlateFormLicensePlateInputField"
          textTransform={text => text.replace(/[^a-zA-Z0-9]/g, '')}
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
