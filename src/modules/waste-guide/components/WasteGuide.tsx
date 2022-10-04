import React, {useContext, useMemo} from 'react'
import {Box} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Address} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {
  BulkyAndHouseholdWasteImage,
  WasteGuideNotFoundImage,
} from '@/modules/waste-guide/assets/images'
import {
  WasteGuideForAmsterdam,
  WasteGuideForWeesp,
  WasteGuideNotFound,
} from '@/modules/waste-guide/components'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {transformWasteGuideResponse} from '@/modules/waste-guide/utils'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'

type Props = {
  address: Address
}

export const WasteGuide = ({address}: Props) => {
  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape && !address ? Row : Column

  const {data, isLoading} = useGetGarbageCollectionAreaQuery(
    {
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    },
    {skip: !address},
  )

  const environment = useEnvironment()
  const wasteGuide = useMemo(
    () => data && transformWasteGuideResponse(data, address, environment),
    [address, data, environment],
  )

  if (isLoading || wasteGuide === undefined) {
    return <PleaseWait />
  }

  const forWeesp = address.woonplaats === 'Weesp'
  const WasteGuideForCity = forWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam

  const hasWasteGuide = Object.keys(wasteGuide).length > 0
  const Image = hasWasteGuide
    ? BulkyAndHouseholdWasteImage
    : WasteGuideNotFoundImage
  const imageHeight = hasWasteGuide ? 192 : 256

  return (
    <Track align="between" grow gutter={forWeesp ? 'md' : 'xxxl'}>
      <Column>
        <Box>
          <StreetAddressWithEditButton address={address.adres} />
        </Box>
        {hasWasteGuide || forWeesp ? (
          <WasteGuideForCity address={address} wasteGuide={wasteGuide} />
        ) : (
          <WasteGuideNotFound />
        )}
      </Column>
      <Column align="center">
        <Figure height={imageHeight}>
          <Image />
        </Figure>
      </Column>
    </Track>
  )
}
