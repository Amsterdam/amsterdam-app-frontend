import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {
  Address,
  AddressCity,
  HighAccuracyPurposeKey,
} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {AddressSearch} from '@/modules/address/components/form/AddressSearch'
import {LocationTopTaskButton} from '@/modules/address/components/form/LocationTopTaskButton'
import {MyAddressButton} from '@/modules/address/components/form/MyAddressButton'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {addAddress} from '@/modules/address/slice'

export type AddressSearchFields = {
  city: AddressCity | undefined
  number: string
  street: string
}

export const AddressForm = ({
  highAccuracyPurposeKey,
  showAddressButtons = false,
}: {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  showAddressButtons?: boolean
}) => {
  const form = useForm<AddressSearchFields>()
  const setLocationType = useSetLocationType()
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

  const isSearching = form.watch('street')?.length

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <AddressSearch />

        {!isSearching && !!showAddressButtons && (
          <>
            <MyAddressButton testID="ChooseAddressScreenMyAddressButton" />

            <LocationTopTaskButton
              highAccuracyPurposeKey={highAccuracyPurposeKey}
              testID="ChooseAddressScreenLocationTopTaskButton"
            />
          </>
        )}

        {!isSearching && <RecentAddresses onPress={onPressRecentAddress} />}
      </Column>
    </FormProvider>
  )
}
