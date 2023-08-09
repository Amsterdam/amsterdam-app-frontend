import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeStickyFooter} from '@/modules/address/components/location/SelectLocationTypeStickyFooter'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {useLocationInfo} from '@/modules/waste-guide/hooks/useLocationInfo'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const {selectedAddress} = useLocationInfo()

  return (
    <Screen
      scroll={!!selectedAddress}
      stickyFooter={<SelectLocationTypeStickyFooter />}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {selectedAddress ? <WasteGuide /> : <RequestLocation />}
    </Screen>
  )
}
