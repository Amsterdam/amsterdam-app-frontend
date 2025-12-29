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
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {
  addAddress,
  addRecentAddress,
  setModuleCustomAddress,
  useMyAddress,
} from '@/modules/address/slice'
import {addDerivedAddressFields} from '@/modules/address/utils/addDerivedAddressFields'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'

export type AddressSearchFields = {
  city: AddressCity | undefined
  number: string
  street: string
}

type Props =
  | {
      highAccuracyPurposeKey?: HighAccuracyPurposeKey
      moduleSlug: ModuleSlug
      saveAsMyAddress?: never
    }
  | {
      highAccuracyPurposeKey?: HighAccuracyPurposeKey
      moduleSlug?: never
      saveAsMyAddress?: true
    }

export const AddressForm = ({
  highAccuracyPurposeKey,
  moduleSlug,
  saveAsMyAddress,
}: Props) => {
  const form = useForm<AddressSearchFields>()
  const dispatch = useDispatch()
  const {goBack} = useNavigation()
  const setLocationType = useSetLocationType(moduleSlug || ModuleSlug.address)
  const route = useRoute<AddressModalName.myAddressForm>()
  const myAddress = useMyAddress()

  const {setAlert} = useAlert()

  const onPressAddress = useCallback(
    (newAddress: Address) => {
      const transformedAddress = addDerivedAddressFields(newAddress)

      dispatch(addRecentAddress(transformedAddress))

      if (myAddress?.bagId === newAddress.bagId) {
        setLocationType('address')
      } else if (saveAsMyAddress) {
        dispatch(addAddress(transformedAddress))
        setLocationType('address')
      } else {
        dispatch(
          setModuleCustomAddress({
            moduleSlug: moduleSlug!,
            address: transformedAddress,
          }),
        )
        setLocationType('custom')
      }

      if (route?.name === AddressModalName.myAddressForm) {
        setAlert(alerts.addAddressSuccess)
      }

      goBack()
    },
    [
      dispatch,
      myAddress?.bagId,
      saveAsMyAddress,
      route?.name,
      goBack,
      setLocationType,
      moduleSlug,
      setAlert,
    ],
  )

  const isSearching = form.watch('street')?.length

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <AddressSearch onPressAddress={onPressAddress} />

        {!isSearching && !saveAsMyAddress && !!moduleSlug && (
          <>
            <MyAddressButton
              moduleSlug={moduleSlug}
              onPress={() => {
                setLocationType('address')
                goBack()
              }}
              testID="ChooseAddressScreenMyAddressButton"
            />

            <LocationTopTaskButton
              highAccuracyPurposeKey={highAccuracyPurposeKey}
              moduleSlug={moduleSlug}
              testID="ChooseAddressScreenLocationTopTaskButton"
            />
          </>
        )}

        {!isSearching && <RecentAddresses onPress={onPressAddress} />}
      </Column>
    </FormProvider>
  )
}
