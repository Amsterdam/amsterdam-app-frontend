import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {
  Address,
  AddressCity,
  HighAccuracyPurposeKey,
} from '@/modules/address/types'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/address/alerts'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {AddressSearch} from '@/modules/address/components/form/AddressSearch'
import {LocationTopTaskButton} from '@/modules/address/components/form/LocationTopTaskButton'
import {MyAddressButton} from '@/modules/address/components/form/MyAddressButton'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {AddressModalName} from '@/modules/address/routes'
import {addRecentAddress} from '@/modules/address/slice'
import {addDerivedAddressFields} from '@/modules/address/utils/addDerivedAddressFields'
import {useAlert} from '@/store/slices/alert'
import {ReduxKey} from '@/store/types/reduxKey'

export type AddressSearchFields = {
  city: AddressCity | undefined
  number: string
  street: string
}

export const AddressForm = ({
  highAccuracyPurposeKey,
  reduxKey = ReduxKey.address,
  showAddressButtons = false,
}: {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
  reduxKey?: ReduxKey
  showAddressButtons?: boolean
}) => {
  const form = useForm<AddressSearchFields>()
  const dispatch = useDispatch()
  const {goBack} = useNavigation()
  const {addAddress, setLocationType} = useModuleBasedSelectedAddress(reduxKey)
  const route = useRoute<AddressModalName.myAddressForm>()

  const {setAlert} = useAlert()

  const onPressAddress = useCallback(
    (newAddress: Address) => {
      setLocationType('address')

      const transformedAddress = addDerivedAddressFields(newAddress)

      addAddress(transformedAddress)
      dispatch(addRecentAddress(transformedAddress))

      if (route?.name === AddressModalName.myAddressForm) {
        setAlert(alerts.addAddressSuccess)
      }

      goBack()
    },
    [setLocationType, goBack, dispatch, setAlert, addAddress, route],
  )

  const isSearching = form.watch('street')?.length

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <AddressSearch onPressAddress={onPressAddress} />

        {!isSearching && !!showAddressButtons && (
          <>
            <MyAddressButton
              onPress={onPressAddress}
              testID="ChooseAddressScreenMyAddressButton"
            />

            <LocationTopTaskButton
              highAccuracyPurposeKey={highAccuracyPurposeKey}
              reduxKey={reduxKey}
              testID="ChooseAddressScreenLocationTopTaskButton"
            />
          </>
        )}

        {!isSearching && <RecentAddresses onPress={onPressAddress} />}
      </Column>
    </FormProvider>
  )
}
