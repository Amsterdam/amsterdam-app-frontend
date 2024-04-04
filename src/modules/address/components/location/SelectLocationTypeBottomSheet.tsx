import {useCallback, useEffect} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocusWhenBottomsheetIsOpen} from '@/hooks/accessibility/useAccessibilityFocusWhenBottomsheetIsOpen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useLocationType} from '@/modules/address/hooks/useLocationType'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {AddressModalName} from '@/modules/address/routes'
import {setGetLocation} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {Permissions} from '@/types/permissions'

type Props = {
  highAccuracyPurposeKey: HighAccuracyPurposeKey
}

export const SelectLocationTypeBottomSheet = ({
  highAccuracyPurposeKey,
}: Props) => {
  const dispatch = useDispatch()
  const address = useAddress()
  const {setLocationType} = useLocationType()
  const {navigate} = useNavigation<AddressModalName>()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen()

  const {close: closeBottomSheet} = useBottomSheet()
  const focusRef = useAccessibilityFocusWhenBottomsheetIsOpen()

  const {hasPermission, requestPermission} = usePermission(Permissions.location)

  useEffect(() => {
    dispatch(setGetLocation({highAccuracyPurposeKey}))
  }, [dispatch, hasPermission, highAccuracyPurposeKey])

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

    dispatch(setGetLocation({highAccuracyPurposeKey}))

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')

    closeBottomSheet()
  }, [
    closeBottomSheet,
    dispatch,
    highAccuracyPurposeKey,
    navigateToInstructionsScreen,
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
            testID="BottomSheetSelectLocationButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
