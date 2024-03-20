import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocusWhenBottomsheetIsOpen} from '@/hooks/accessibility/useAccessibilityFocusWhenBottomsheetIsOpen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {useLocationType} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {Permissions} from '@/types/permissions'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
}

export const SelectLocationTypeBottomSheet = ({
  highAccuracyPurposeKey,
}: Props) => {
  const locationType = useLocationType()
  const address = useAddress()

  const {navigate} = useNavigation<AddressModalName>()
  const setLocationType = useSetLocationType()
  const navigateToInstructionsScreen = useCallback(
    () => navigate(AddressModalName.locationPermissionInstructions),
    [navigate],
  )

  const {close: closeBottomSheet, isOpen: bottomSheetIsOpen} = useBottomSheet()
  const focusRef = useAccessibilityFocusWhenBottomsheetIsOpen()

  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    logAction: PiwikAction.locationOrAddressSelectionChange,
    logName: 'BottomSheetAddressOrLocationSelect',
  })

  const {requestPermission} = usePermission(Permissions.location)

  const onPressAddressButton = useCallback(() => {
    setLocationType('address')

    if (locationType !== 'address') {
      onEvent(undefined, {
        dimensions: {
          [PiwikDimension.newState]: 'address',
        },
      })
    }

    if (!address) {
      navigate(AddressModalName.addressForm)

      return
    }

    closeBottomSheet()
  }, [
    address,
    closeBottomSheet,
    locationType,
    navigate,
    onEvent,
    setLocationType,
  ])

  const onPressLocationButton = useCallback(async () => {
    const permission = await requestPermission()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')

    if (locationType !== 'location') {
      onEvent(undefined, {
        dimensions: {
          [PiwikDimension.newState]: 'location',
        },
      })
    }

    closeBottomSheet()
  }, [
    closeBottomSheet,
    locationType,
    navigateToInstructionsScreen,
    onEvent,
    requestPermission,
    setLocationType,
  ])

  return (
    <BottomSheet testID="SelectLocationTypeBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Row
            align="between"
            valign="center">
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
                  navigate(ModuleSlug.user)

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
            shouldRequestPermission={bottomSheetIsOpen}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
