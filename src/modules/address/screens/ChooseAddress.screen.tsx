import {useCallback} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {AddressForm} from '@/modules/address/components/AddressForm'
import {RecentAddresses} from '@/modules/address/components/RecentAddresses'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useRequestLocationFetch} from '@/modules/address/hooks/useRequestLocationFetch'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName, AddressRouteName} from '@/modules/address/routes'
import {useAddress} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'
import {devLog} from '@/processes/development'
import {Permissions} from '@/types/permissions'

type Props = NavigationProps<AddressRouteName.chooseAddress>

export const ChooseAddressScreen = ({route}: Props) => {
  const {highAccuracyPurposeKey} = route.params ?? {}

  const address = useAddress()
  const setLocationType = useSetLocationType()
  const {navigate, goBack} = useNavigation()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )

  const {requestPermission} = usePermission(Permissions.location)
  const {startLocationFetch} = useRequestLocationFetch(highAccuracyPurposeKey)

  const onPressAddressButton = useCallback(() => {
    setLocationType('address')

    if (!address) {
      navigate(AddressModalName.addressForm)

      return
    }

    goBack()
  }, [setLocationType, address, goBack, navigate])

  const onPressLocationButton = useCallback(async () => {
    const permission = await requestPermission()

    startLocationFetch()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')

    goBack()
  }, [
    goBack,
    startLocationFetch,
    navigateToInstructionsScreen,
    requestPermission,
    setLocationType,
  ])

  return (
    <Screen
      hasStickyAlert
      testID="ChooseAddressScreen">
      <AddressForm />

      <Box grow>
        <Column gutter="lg">
          <Column gutter="md">
            <Row align="between">
              <AddressTopTaskButton
                logName={`BottomSheetAddAddressButton${address?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
                onPress={onPressAddressButton}
                testID="ChooseAddressScreenSelectAddressButton"
              />
              {!!address && (
                <Button
                  label="Wijzig"
                  onPress={() => {
                    navigate(ModuleSlug.address, {
                      screen: AddressRouteName.address,
                    })

                    setLocationType('address')
                  }}
                  testID="ChooseAddressScreenChangeAddressButton"
                  variant="tertiary"
                />
              )}
            </Row>

            <LocationTopTaskButton
              highAccuracyPurposeKey={highAccuracyPurposeKey}
              onPress={onPressLocationButton}
              testID="ChooseAddressScreenSelectLocationButton"
            />
          </Column>
          <RecentAddresses onPress={a => devLog(a)} />
        </Column>
      </Box>
    </Screen>
  )
}
