import React, {useContext} from 'react'
import {useSelector} from 'react-redux'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
import {
  RequestAddress,
  WasteGuideByAddress,
} from '@/modules/waste-guide/components'
import {DeviceContext} from '@/providers'

export const WasteGuideScreen = () => {
  const {isPortrait} = useContext(DeviceContext)
  const {primary, temp} = useSelector(selectAddress)
  const address = temp ?? primary

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
    <Screen>
      <WasteGuideByAddress address={address} />
    </Screen>
  )
}
