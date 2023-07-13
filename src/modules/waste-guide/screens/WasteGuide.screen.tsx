import {useContext} from 'react'
import {useSelector} from 'react-redux'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
import {RequestAddress} from '@/modules/waste-guide/components/RequestAddress'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {DeviceContext} from '@/providers'

export const WasteGuideScreen = () => {
  const {isPortrait} = useContext(DeviceContext)
  const address = useSelector(selectAddress)

  if (!address) {
    return (
      <Screen
        scroll={false}
        withLeftInset={isPortrait}
        withRightInset={isPortrait}>
        <RequestAddress />
      </Screen>
    )
  }

  return (
    <Screen
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <WasteGuide address={address} />
    </Screen>
  )
}
