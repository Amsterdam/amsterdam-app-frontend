import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {Column} from '@/components/ui/layout'
import {
  BoxTitle,
  DisplayAddress,
  RequestAddress,
} from '@/modules/address/components'
import {selectAddress} from '@/modules/address/slice'

export const Address = () => {
  const {primary: address} = useSelector(selectAddress)

  return (
    <Box background="white">
      <Column gutter="md">
        <BoxTitle />
        {address ? <DisplayAddress address={address} /> : <RequestAddress />}
      </Column>
    </Box>
  )
}
