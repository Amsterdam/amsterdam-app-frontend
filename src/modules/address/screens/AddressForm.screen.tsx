import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Screen} from '@/components/ui/layout/Screen'
import {AddressForm} from '@/modules/address/components/AddressForm'

export const AddressFormScreen = () => (
  <Screen
    scroll={false}
    stickyHeader={
      <ModalHeader
        testID="AddressModalHeader"
        title="Adres"
      />
    }
    testID="AddressModalScreen">
    <AddressForm />
  </Screen>
)
