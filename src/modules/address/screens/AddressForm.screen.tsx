import {ModalHeader} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {AddressForm} from '@/modules/address/components'

export const AddressFormScreen = () => (
  <Screen
    scroll={false}
    stickyHeader={<ModalHeader testID="AddressModalHeader" title="Adres" />}
    testID="AddressModalScreen">
    <AddressForm />
  </Screen>
)
