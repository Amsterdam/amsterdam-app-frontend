import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {useStartGettingLocation} from '@/modules/address/hooks/useStartGettingLocation'
import {AddressModalName, AddressRouteName} from '@/modules/address/routes'
import {useAddress} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {Permissions} from '@/types/permissions'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
}

export const SelectLocationTypeBottomSheetContent = ({
  highAccuracyPurposeKey,
}: Props) => {
  const address = useAddress()
  const setLocationType = useSetLocationType()
  const {navigate} = useNavigation<AddressModalName>()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )

  const {close: closeBottomSheet} = useBottomSheet()
  const focusRef = useSetBottomSheetElementFocus()

  const {requestPermission} = usePermission(Permissions.location)

  const {makeSetStartGettingLocation} = useStartGettingLocation(
    highAccuracyPurposeKey,
  )

  const onPressAddressButton = useCallback(() => {
    setLocationType('address')

    if (!address) {
      navigate(AddressModalName.addressForm)

      return
    }

    closeBottomSheet()
  }, [setLocationType, address, closeBottomSheet, navigate])

  const onPressLocationButton = useCallback(async () => {
    const permission = await requestPermission()

    makeSetStartGettingLocation()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')

    closeBottomSheet()
  }, [
    closeBottomSheet,
    makeSetStartGettingLocation,
    navigateToInstructionsScreen,
    requestPermission,
    setLocationType,
  ])

  return (
    <Box grow>
      <Column gutter="md">
        <Row align="between">
          <Title
            accessibilityHint="kies of u uw adres of huidige locatie wil gebruiken"
            level="h3"
            ref={focusRef}
            text="Locaties"
          />
          {!!address && (
            <Button
              label="Wijzig adres"
              onPress={() => {
                navigate(ModuleSlug.address, {
                  screen: AddressRouteName.address,
                })

                setLocationType('address')
              }}
              testID="BottomSheetChangeAddressButton"
              variant="tertiary"
            />
          )}
        </Row>
        <AddressTopTaskButton
          logName={`BottomSheetAddAddressButton${address?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
          onPress={onPressAddressButton}
          testID="BottomSheetSelectAddressButton"
        />
        <LocationTopTaskButton
          highAccuracyPurposeKey={highAccuracyPurposeKey}
          onPress={onPressLocationButton}
          testID="BottomSheetSelectLocationButton"
        />
      </Column>
    </Box>
  )
}
