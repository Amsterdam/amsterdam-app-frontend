import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {RefObject} from 'react'
import type {TextInput} from 'react-native'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'

export const NumberSearchField = ({
  ref,
}: {
  ref: RefObject<TextInput | null>
}) => (
  <SearchFieldControlled<AddressSearchFields, 'number'>
    accessibilityLabel="Zoek naar huisnummer"
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="numbers-and-punctuation"
    name="number"
    placeholder="Vul uw huisnummer in"
    ref={ref}
    testID="AddressNumberInputSearchField"
  />
)
