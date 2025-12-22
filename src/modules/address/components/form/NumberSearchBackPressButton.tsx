import {useFormContext} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import {Button} from '@/components/ui/buttons/Button'

export const NumberSearchBackPressButton = ({
  onPressBack,
}: {
  onPressBack: () => void
}) => {
  const {watch} = useFormContext<AddressSearchFields>()

  const street = watch('street')

  return (
    <Button
      accessibilityHint="klik om straatnaam te veranderen"
      accessibilityLabel={street}
      iconName="chevron-up"
      label={street}
      onPress={onPressBack}
      testID="AddressFormNumberSearchBackPressButton"
      variant="tertiary"
    />
  )
}
