import React, {useContext} from 'react'
import {useSelector} from 'react-redux'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
import {RequestAddress, WasteGuide} from '@/modules/waste-guide/components'
import {DeviceContext} from '@/providers'

export const WasteGuideScreen = () => {
  const {isPortrait} = useContext(DeviceContext)
  const address = useSelector(selectAddress)

  if (!address.adres) {
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
    <Screen>
      <WasteGuide address={address} />
    </Screen>
  )
}
