import {useContext} from 'react'
import {Screen} from '@/components/ui/layout/Screen'
import {SelectLocationTypeStickyFooter} from '@/modules/address/components/location/SelectLocationTypeStickyFooter'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {DeviceContext} from '@/providers/device.provider'

export const WasteGuideScreen = () => {
  const {isPortrait} = useContext(DeviceContext)
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
