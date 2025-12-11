import {FormProvider, useForm} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/screens/ChooseAddress.screen'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {AddressForm} from '@/modules/address/components/AddressForm'

export const AddressFormScreen = () => {
  const form = useForm<AddressSearchFields>()

  return (
    <Screen
      scroll={false}
      stickyHeader={
        <ModalHeader
          testID="AddressModalHeader"
          title="Adres"
        />
      }
      testID="AddressModalScreen">
      <Box>
        <FormProvider {...form}>
          <AddressForm />
        </FormProvider>
      </Box>
    </Screen>
  )
}
