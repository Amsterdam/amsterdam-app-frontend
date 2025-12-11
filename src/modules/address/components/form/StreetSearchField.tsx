import type {AddressSearchFields} from '@/modules/address/screens/ChooseAddress.screen'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'

export const StreetSearchField = () => (
  <SearchFieldControlled<AddressSearchFields, 'street'>
    accessibilityLabel="Zoek naar straatnaam of postcode"
    autoCapitalize="none"
    autoCorrect={false}
    name="street"
    placeholder="Vul uw straatnaam of postcode in"
    testID="AddressStreetInputSearchField"
  />
)
