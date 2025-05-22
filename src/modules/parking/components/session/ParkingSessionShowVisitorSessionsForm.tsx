import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useBoolean} from '@/hooks/useBoolean'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'

type Props = {
  isFormVisible?: boolean
  onVehicleIdEntered: (vehicleId: string) => void
}

export const ParkingSessionShowVisitorSessionsForm = ({
  isFormVisible,
  onVehicleIdEntered,
}: Props) => {
  const form = useForm<{vehicle_id: string}>()
  const {handleSubmit} = form
  const {value: isEnabled, enable} = useBoolean(isFormVisible)

  const onSubmit = ({vehicle_id}: {vehicle_id: string}) => {
    onVehicleIdEntered(vehicle_id)
  }

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        {!!isEnabled && (
          <Column gutter="md">
            <Paragraph variant="intro">
              Voer uw kenteken in om uw actieve parkeersessie te zien.
            </Paragraph>
            <ParkingVehicleIdTextInput
              inputInstructions="Alleen letters en cijfers"
              label="Uw kenteken"
              testID="ParkingSessionShowVisitorSessionsFormLicensePlateInputField"
            />
          </Column>
        )}
        <Button
          isLoading
          label="Bekijk parkeersessies"
          onPress={isEnabled ? handleSubmit(onSubmit) : enable}
          testID="ParkingSessionShowVisitorSessionsFormSubmitButton"
          variant="secondary"
        />
      </Column>
    </FormProvider>
  )
}
