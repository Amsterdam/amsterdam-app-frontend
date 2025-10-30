import {useCallback} from 'react'
import {FormProvider, useController} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {ParkingStartSessionParkingMachineFavoriteButton} from '@/modules/parking/components/session/ParkingStartSessionParkingMachineFavoriteButton'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type FieldValues = {
  parking_machine: string
}

export const ParkingSessionParkingMachineBottomSheetContent = () => {
  const form = useForm<FieldValues>()
  const {handleSubmit} = form
  const {close} = useBottomSheet()

  const {
    field: {onChange},
  } = useController<FieldValues, 'parking_machine'>({
    name: 'parking_machine',
  })

  const onPressFavorite = useCallback(
    (favorite: string) => {
      onChange(favorite)
      close()
    },
    [close, onChange],
  )

  const onSubmit = handleSubmit(({parking_machine}: FieldValues) => {
    onChange(parking_machine)
    close()
  })

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="lg">
          <TextInputField
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect={false}
            autoFocus
            defaultValue=""
            hasClearButton={false}
            keyboardType="number-pad"
            label="Nummer van parkeerautomaat of paal"
            name="parking_machine"
            rules={{
              required: 'Vul nummer van parkeerautomaat in',
              pattern: {
                value: /^[0-9]*$/,
                message: 'Alleen cijfers zijn toegestaan',
              },
            }}
            testID="ParkingSessionParkingMachineInputField"
            textTransform={text => text.replace(/[^0-9]/g, '')}
          />
          <ParkingStartSessionParkingMachineFavoriteButton
            onPress={onPressFavorite}
          />
          <Button
            label="Bevestig"
            onPress={onSubmit}
            testID="ParkingSessionAddLicensePlateSubmitButton"
          />
        </Column>
      </Box>
    </FormProvider>
  )
}
