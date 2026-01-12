import {FormProvider, useForm} from 'react-hook-form'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {
  AddressForm,
  type AddressSearchFields,
} from '@/modules/address/components/AddressForm'
import {AddressSearchField} from '@/modules/address/components/form/AddressSearchField'

export const MyAddressFormScreen = () => {
  const addressForm = useForm<AddressSearchFields>()

  return (
    <FormProvider {...addressForm}>
      <Screen
        keyboardAware
        stickyHeader={
          <>
            <ModalHeader
              testID="AddressModalHeader"
              title="Adres"
            />
            <AddressSearchField />
          </>
        }
        testID="AddressModalScreen">
        <Box>
          <AddressForm saveAsMyAddress />
        </Box>
      </Screen>
    </FormProvider>
  )
}
