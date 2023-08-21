import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Alert} from '@/components/ui/feedback/Alert'
import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {LocationType} from '@/modules/address/types'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {useLocationType} from '@/modules/waste-guide/hooks/useLocationType'
import {useSelectedAddressForWasteGuide} from '@/modules/waste-guide/hooks/useSelectedAddressForWasteGuide'
import {setLocationType} from '@/modules/waste-guide/slice'

const getShouldRequestLocation = (
  locationType?: LocationType,
  hasAddress?: boolean,
  hasCoordinates?: boolean,
) =>
  !locationType ||
  (locationType === 'address' && !hasAddress) ||
  (locationType === 'location' && !hasCoordinates)

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const locationType = useLocationType()
  const {address} = useSelectedAddressForWasteGuide()
  const coordinates = useLastKnownCoordinates()
  const dispatch = useDispatch()
  const onSelectAddress = useCallback(
    () => dispatch(setLocationType('address')),
    [dispatch],
  )
  const onSelectLocation = useCallback(
    () => dispatch(setLocationType('location')),
    [dispatch],
  )
  const shouldRequestLocation = getShouldRequestLocation(
    locationType,
    !!address,
    !!coordinates,
  )

  return (
    <Screen
      scroll={!shouldRequestLocation}
      stickyFooter={
        <SelectLocationTypeBottomSheet
          onSelectAddress={onSelectAddress}
          onSelectLocation={onSelectLocation}
        />
      }
      stickyHeader={<Alert />}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {shouldRequestLocation ? <RequestLocation /> : <WasteGuide />}
    </Screen>
  )
}
