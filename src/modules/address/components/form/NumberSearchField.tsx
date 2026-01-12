import {useEffect, useRef} from 'react'
import type {AddressSearchFields} from '@/modules/address/components/AddressForm'
import type {TextInput} from 'react-native'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {NumberSearchBackPressButton} from '@/modules/address/components/form/NumberSearchBackPressButton'

export const NumberSearchField = () => {
  const ref = useRef<TextInput>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Column>
      <Row align="start">
        <NumberSearchBackPressButton />
      </Row>
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
    </Column>
  )
}
