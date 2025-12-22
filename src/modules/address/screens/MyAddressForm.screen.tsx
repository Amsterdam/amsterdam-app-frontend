import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {AddressSearchFields} from '@/modules/address/screens/ChooseAddress.screen'
import type {Address} from '@/modules/address/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressForm} from '@/modules/address/components/AddressForm'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {addAddress} from '@/modules/address/slice'

export const MyAddressFormScreen = () => {
  const form = useForm<AddressSearchFields>()
  const setLocationType = useSetLocationType()
  const isSearching = form.watch('street')?.length
  const dispatch = useDispatch()
  const {goBack} = useNavigation()

  const onPressRecentAddress = useCallback(
    (newAddress: Address) => {
      setLocationType('address')

      dispatch(addAddress(newAddress))

      goBack()
    },
    [setLocationType, goBack, dispatch],
  )

  return (
    <Screen
      stickyHeader={
        <ModalHeader
          testID="AddressModalHeader"
          title="Adres"
        />
      }
      testID="AddressModalScreen">
      <Box>
        <Column gutter="lg">
          <FormProvider {...form}>
            <AddressForm />
          </FormProvider>
          {!isSearching && <RecentAddresses onPress={onPressRecentAddress} />}
        </Column>
      </Box>
    </Screen>
  )
}
