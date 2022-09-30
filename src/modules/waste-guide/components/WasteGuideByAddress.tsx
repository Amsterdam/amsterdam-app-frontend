import {Box} from '_components/ui'
import React, {useContext} from 'react'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Address} from '@/modules/address'
import {BulkyAndHouseholdWasteImage} from '@/modules/waste-guide/assets/images'
import {
  AddressTitle,
  WasteGuideForAmsterdam,
  WasteGuideForWeesp,
} from '@/modules/waste-guide/components'
import {DeviceContext} from '@/providers'

type Props = {
  address: Address
}

export const WasteGuideByAddress = ({address}: Props) => {
  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  return (
    <Track
      align="between"
      grow
      gutter={address.woonplaats === 'Weesp' ? 'md' : 'xxxl'}>
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
      <Column align="center">
        <Figure height={192}>
          <BulkyAndHouseholdWasteImage />
        </Figure>
      </Column>
    </Track>
  )
}
