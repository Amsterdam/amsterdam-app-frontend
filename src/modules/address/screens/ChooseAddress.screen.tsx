import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {NavigationProps} from '@/app/navigation/types'
import type {Address, AddressCity} from '@/modules/address/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'

import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressForm} from '@/modules/address/components/AddressForm'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {LocationTopTaskButton} from '@/modules/address/components/form/LocationTopTaskButton'
import {MyAddressButton} from '@/modules/address/components/form/MyAddressButton'

import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressRouteName} from '@/modules/address/routes'
import {addAddress} from '@/modules/address/slice'

type Props = NavigationProps<AddressRouteName.chooseAddress>

export type AddressSearchFields = {
  city: AddressCity | undefined
  number: string
  street: string
}

export const ChooseAddressScreen = ({route}: Props) => {
  const {highAccuracyPurposeKey} = route.params ?? {}
  const dispatch = useDispatch()
  const setLocationType = useSetLocationType()
  const {goBack} = useNavigation()

  const onPressRecentAddress = useCallback(
    (newAddress: Address) => {
      setLocationType('address')

      dispatch(addAddress(newAddress))

      goBack()
    },
    [setLocationType, goBack, dispatch],
  )

  const searchForm = useForm<AddressSearchFields>()
  const isSearching = searchForm.watch('street')?.length

  return (
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ChooseAddressScreen">
      <Box grow>
        <Column gutter="md">
          <FormProvider {...searchForm}>
            <AddressForm />
          </FormProvider>

          {!isSearching && (
            <>
              <MyAddressButton testID="ChooseAddressScreenMyAddressButton" />

              <LocationTopTaskButton
                highAccuracyPurposeKey={highAccuracyPurposeKey}
                testID="ChooseAddressScreenLocationTopTaskButton"
              />
              <RecentAddresses onPress={onPressRecentAddress} />
            </>
          )}
        </Column>
      </Box>
    </Screen>
  )
}
