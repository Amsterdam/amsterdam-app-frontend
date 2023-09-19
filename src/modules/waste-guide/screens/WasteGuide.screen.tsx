import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {useShouldRequestLocation} from '@/modules/address/hooks/useShouldRequestLocation'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const shouldRequestLocation = useShouldRequestLocation(
    ModuleSlug['waste-guide'],
  )

  return (
    <Screen
      scroll={!shouldRequestLocation}
      stickyFooter={
        <SelectLocationTypeBottomSheet
          highAccuracyPurposeKey={
            HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
          }
          slug={ModuleSlug['waste-guide']}
        />
      }
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {shouldRequestLocation ? <RequestLocation /> : <WasteGuide />}
    </Screen>
  )
}
