import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {AddressForm} from '@/modules/address/components/AddressForm'

export const MyAddressFormScreen = () => (
  <Screen
    keyboardAware
    stickyHeader={
      <ModalHeader
        testID="AddressModalHeader"
        title="Adres"
      />
    }
    testID="AddressModalScreen">
    <Box>
      <AddressForm saveAsMyAddress />
    </Box>
  </Screen>
)
