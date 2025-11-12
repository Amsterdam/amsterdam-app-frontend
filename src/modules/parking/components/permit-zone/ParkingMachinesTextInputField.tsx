import {TextInputField} from '@/components/ui/forms/TextInputField'

export const ParkingMachinesTextInputField = () => (
  <TextInputField
    autoComplete="off"
    autoCorrect={false}
    autoFocus
    defaultValue=""
    keyboardType="number-pad"
    name="searchText"
    rules={{
      required: 'Vul nummer van parkeerautomaat in',
      pattern: {
        value: /^[0-9]*$/,
        message: 'Alleen cijfers zijn toegestaan',
      },
    }}
    testID="ParkingMachinesTextInputField"
    textTransform={text => text.replace(/[^0-9]/g, '')}
  />
)
