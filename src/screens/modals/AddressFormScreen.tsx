import React from 'react'
import {NumberInput} from '../../components/features/address/NumberInput'
import {StreetInput} from '../../components/features/address/StreetInput'
import {ScreenWrapper} from '../../components/ui'

export const AddressFormScreen = () => {
  return (
    <ScreenWrapper>
      <StreetInput />
      <NumberInput />
    </ScreenWrapper>
  )
}
