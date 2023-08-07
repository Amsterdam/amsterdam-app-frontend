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

  if (!address) {
    return (
      <Screen
        scroll={false}
        stickyFooter={<SelectLocationTypeStickyFooter />}
        withLeftInset={isPortrait}
        withRightInset={isPortrait}>
        <RequestLocation />
      </Screen>
    )
  }

  return (
    <Screen
      stickyFooter={<SelectLocationTypeStickyFooter />}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <WasteGuide address={address} />
    </Screen>
  )
}
