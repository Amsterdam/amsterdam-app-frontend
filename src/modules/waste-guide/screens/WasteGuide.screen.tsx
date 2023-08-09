import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeStickyFooter} from '@/modules/address/components/location/SelectLocationTypeStickyFooter'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const address = useAddress()

  return (
    <Screen
      scroll={!!address}
      stickyFooter={<SelectLocationTypeStickyFooter />}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {address ? <WasteGuide address={address} /> : <RequestLocation />}
    </Screen>
  )
}
