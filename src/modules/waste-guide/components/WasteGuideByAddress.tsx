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
  const Track = isLandscape && !address ? Row : Column

  const forWeesp = address.woonplaats === 'Weesp'
  const WasteGuideForCity = forWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam

  return (
    <Track align="between" grow gutter={forWeesp ? 'md' : 'xxxl'}>
      <Column>
        <Box>
          <AddressTitle adres={address.adres} />
        </Box>
        <WasteGuideForCity address={address} />
      </Column>
      <Column align="center">
        <Figure height={192}>
          <BulkyAndHouseholdWasteImage />
        </Figure>
      </Column>
    </Track>
  )
}
