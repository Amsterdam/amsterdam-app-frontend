import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useBoolean} from '@/hooks/useBoolean'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useVisitorVehicleId} from '@/modules/parking/slice'

type Props = {
  isFormVisible?: boolean
}

export const ParkingSessionShowVisitorSessionsForm = ({
  isFormVisible,
}: Props) => {
  const form = useForm<{vehicle_id: string}>()
  const {handleSubmit} = form
  const {value: isEnabled, enable} = useBoolean(isFormVisible)
  const {visitorVehicleId, setVisitorVehicleId} = useVisitorVehicleId()

  const onSubmit = ({vehicle_id}: {vehicle_id: string}) => {
    setVisitorVehicleId(vehicle_id)
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
              defaultValue={visitorVehicleId}
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
