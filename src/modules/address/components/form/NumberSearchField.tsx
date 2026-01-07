import {useEffect, useRef} from 'react'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {TextInput} from 'react-native'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'

export const NumberSearchField = () => {
  const ref = useRef<TextInput>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
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
}
