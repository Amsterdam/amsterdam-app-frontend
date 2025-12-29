import {TextInput} from 'react-native'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {RefObject} from 'react'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'

export const StreetSearchField = ({
  ref,
}: {
  ref: RefObject<TextInput | null>
}) => (
  <SearchFieldControlled<AddressSearchFields, 'street'>
    accessibilityLabel="Zoek naar straatnaam of postcode"
    autoCapitalize="none"
    autoCorrect={false}
    focusable
    name="street"
    placeholder="Vul uw straatnaam of postcode in"
    ref={ref}
    testID="AddressStreetInputSearchField"
  />
)
