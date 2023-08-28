import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {useShouldRequestLocation} from '@/modules/address/hooks/useShouldRequestLocation'
import {ModuleSlug} from '@/modules/slugs'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const {shouldRequestLocation} = useShouldRequestLocation()

  return (
    <Screen
      scroll={!shouldRequestLocation}
      stickyFooter={
        <SelectLocationTypeBottomSheet slug={ModuleSlug['waste-guide']} />
      }
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {shouldRequestLocation ? <RequestLocation /> : <WasteGuide />}
    </Screen>
  )
}
