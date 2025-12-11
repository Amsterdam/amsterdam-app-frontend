import {FormProvider, useForm} from 'react-hook-form'
import type {NavigationProps} from '@/app/navigation/types'
import type {Address, AddressCity, BaseAddress} from '@/modules/address/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'

import {AddressForm} from '@/modules/address/components/AddressForm'
import {LocationTopTaskButton} from '@/modules/address/components/form/LocationTopTaskButton'
import {MyAddressButton} from '@/modules/address/components/form/MyAddressButton'

import {AddressRouteName} from '@/modules/address/routes'

type Props = NavigationProps<AddressRouteName.chooseAddress>

export type AddressSearchFields = {
  address: Address | BaseAddress
  city: AddressCity | undefined
  number: string
  street: string
}

export const ChooseAddressScreen = ({route}: Props) => {
  const {highAccuracyPurposeKey} = route.params ?? {}
  // const dispatch = useDispatch()
  // const address = useAddress()
  // const setLocationType = useSetLocationType()
  // const {navigate, goBack} = useNavigation()
  // const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
  //   Permissions.location,
  // )

  // const {requestPermission} = usePermission(Permissions.location)
  // const {startLocationFetch} = useRequestLocationFetch(highAccuracyPurposeKey)

  // const onPressAddressButton = useCallback(
  //   (newAddress?: Address) => {
  //     setLocationType('address')

  //     if (!address && !newAddress) {
  //       navigate(AddressModalName.addressForm)

  //       return
  //     }

  //     if (newAddress) {
  //       dispatch(addAddress(newAddress))
  //     }

  //     goBack()
  //   },
  //   [setLocationType, address, goBack, navigate, dispatch],
  // )

  // const onPressLocationButton = useCallback(async () => {
  //   const permission = await requestPermission()

  //   startLocationFetch()

  //   if (!permission) {
  //     navigateToInstructionsScreen()

  //     return
  //   }

  //   setLocationType('location')

  //   goBack()
  // }, [
  //   goBack,
  //   startLocationFetch,
  //   navigateToInstructionsScreen,
  //   requestPermission,
  //   setLocationType,
  // ])

  const searchForm = useForm<AddressSearchFields>()
  const isSearching = searchForm.watch('street')

  return (
    <Screen
      hasStickyAlert
      testID="ChooseAddressScreen">
      <Box grow>
        {/* // <Column gutter="lg">
        //   <Column gutter="md">
        //     <Row align="between">
        //       <AddressTopTaskButton
        //         logName={`BottomSheetAddAddressButton${address?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
        //         onPress={() => onPressAddressButton()}
        //         testID="ChooseAddressScreenSelectAddressButton"
        //       />
        //       {!!address && (
        //         <Button
        //           label="Wijzig"
        //           onPress={() => {
        //             navigate(ModuleSlug.address, {
        //               screen: AddressRouteName.address,
        //             })

        //             setLocationType('address')
        //           }}
        //           small
        //           testID="ChooseAddressScreenChangeAddressButton"
        //           variant="tertiary"
        //         />
        //       )}
        //     </Row>

        //     <LocationTopTaskButton
        //       highAccuracyPurposeKey={highAccuracyPurposeKey}
        //       onPress={onPressLocationButton}
        //       testID="ChooseAddressScreenSelectLocationButton"
        //     />
        //   </Column>
        //   <RecentAddresses onPress={onPressAddressButton} />
        // */}
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
            </>
          )}
        </Column>
      </Box>
    </Screen>
  )
}
