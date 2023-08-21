import {Alert} from '@/components/ui/feedback/Alert'
import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {useLastKnownCoordinates} from '@/modules/address/hooks/useLastKnownCoordinates'
import {LocationType} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {useSelectedAddressForWasteGuide} from '@/modules/waste-guide/hooks/useSelectedAddressForWasteGuide'

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
  const {address, locationType} = useSelectedAddressForWasteGuide()
  const coordinates = useLastKnownCoordinates()

  const shouldRequestLocation = getShouldRequestLocation(
    locationType,
    !!address,
    !!coordinates,
  )

  return (
    <Screen
      scroll={!shouldRequestLocation}
      stickyFooter={
        <SelectLocationTypeBottomSheet slug={ModuleSlug['waste-guide']} />
      }
      stickyHeader={<Alert />}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {shouldRequestLocation ? <RequestLocation /> : <WasteGuide />}
    </Screen>
  )
}
