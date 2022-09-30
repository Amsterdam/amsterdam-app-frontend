import {Box} from '_components/ui'
import React from 'react'
import {Column} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Address} from '@/modules/address'
import {BulkyAndHouseholdWasteImage} from '@/modules/waste-guide/assets/images'
import {
  AddressTitle,
  WasteGuideForAmsterdam,
  WasteGuideForWeesp,
} from '@/modules/waste-guide/components'

type Props = {
  address: Address
}

export const WasteGuideByAddress = ({address}: Props) => (
  <Column
    align="between"
    grow
    gutter={address.woonplaats === 'Amsterdam' ? 'xxxl' : 'md'}>
    <Column>
      <Box>
        <AddressTitle adres={address.adres} />
      </Box>
      {address.woonplaats === 'Weesp' ? (
        <WasteGuideForWeesp />
      ) : (
        <WasteGuideForAmsterdam address={address} />
      )}
    </Column>
    <Figure height={192}>
      <BulkyAndHouseholdWasteImage />
    </Figure>
  </Column>
)
