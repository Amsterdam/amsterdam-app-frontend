import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocusWhenBottomsheetIsOpen} from '@/hooks/accessibility/useAccessibilityFocusWhenBottomsheetIsOpen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useAddressButton} from '@/modules/address/hooks/useAddressButton'
import {useGetLocationType} from '@/modules/address/hooks/useGetLocationType'
import {useLocationButton} from '@/modules/address/hooks/useLocationButton'
import {AddressModalName} from '@/modules/address/routes'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  highAccuracyPurposeKey?: HighAccuracyPurposeKey
}

export const SelectLocationTypeBottomSheet = ({
  highAccuracyPurposeKey,
}: Props) => {
  const address = useAddress()

  const {navigate} = useNavigation<AddressModalName>()
  const {onPress: onPressAddressButton} = useAddressButton()
  const {
    onPress: onPressLocationButton,
    hasLocationPermission,
    hasLocationError,
    currentCoordinates,
    isLoadingCurrentCoordinates,
  } = useLocationButton(highAccuracyPurposeKey)
  const {setLocationType} = useGetLocationType()

  const focusRef = useAccessibilityFocusWhenBottomsheetIsOpen()

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
            coordinates={currentCoordinates}
            hasLocationPermission={hasLocationPermission}
            hasTechnicalError={hasLocationError}
            loading={isLoadingCurrentCoordinates}
            logName={`BottomSheetSelectLocationButton${hasLocationPermission && currentCoordinates ? 'SelectLocation' : 'AddLocation'}`}
            onPress={onPressLocationButton}
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
