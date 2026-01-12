import {useEffect, useRef} from 'react'
import {TextInput} from 'react-native'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'

export const StreetSearchField = () => {
  const ref = useRef<TextInput>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
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
}
