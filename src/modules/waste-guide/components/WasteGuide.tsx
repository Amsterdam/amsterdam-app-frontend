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

  const {data, isLoading} = useGetGarbageCollectionAreaQuery({
    lon: address?.centroid[0] ?? '',
    lat: address?.centroid[1] ?? '',
  })

  const environment = useEnvironment()
  const wasteGuide = useMemo(
    () => data && transformWasteGuideResponse(data, address, environment),
    [address, data, environment],
  )

  if (isLoading || wasteGuide === undefined) {
    return <PleaseWait />
  }

  const cityIsWeesp = address.woonplaats === 'Weesp'
  const WasteGuideForCity = cityIsWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam

  const hasWasteGuide = Object.keys(wasteGuide).length > 0
  const Image =
    hasWasteGuide || cityIsWeesp
      ? BulkyAndHouseholdWasteImage
      : WasteGuideNotFoundImage
  const imageHeight = hasWasteGuide || cityIsWeesp ? 192 : 256

  const Track = isLandscape && cityIsWeesp ? Row : Column

  return (
    <Box grow>
      <Track
        align="between"
        grow
        gutter={cityIsWeesp || isLandscape ? 'md' : 'xxxl'}>
        <Column gutter="md">
          <StreetAddressWithEditButton address={address.adres} />
          {hasWasteGuide || cityIsWeesp ? (
            <WasteGuideForCity address={address} wasteGuide={wasteGuide} />
          ) : (
            <WasteGuideNotFound />
          )}
        </Column>
        <Column align={cityIsWeesp ? 'end' : 'center'}>
          <Figure height={imageHeight}>
            <Image />
          </Figure>
        </Column>
      </Track>
    </Box>
  )
}
