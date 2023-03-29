import {useContext, useMemo} from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {FigureWithFacadesBackground} from '@/components/ui/media'
import {Address, AddressCity} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {
  HouseholdWasteToContainerImage,
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
import {useTheme} from '@/themes'

type Props = {
  address: Address
}

export const WasteGuide = ({address}: Props) => {
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()

  const {data, isLoading} = useGetGarbageCollectionAreaQuery({
    lon: address?.centroid?.[0] ?? '',
    lat: address?.centroid?.[1] ?? '',
  })

  const environment = useEnvironment()
  const wasteGuide = useMemo(
    () => data && transformWasteGuideResponse(data, address, environment),
    [address, data, environment],
  )

  if (isLoading || wasteGuide === undefined) {
    return <PleaseWait />
  }

  const cityIsWeesp = address.woonplaats === AddressCity.Weesp
  const WasteGuideForCity = cityIsWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam

  const hasWasteGuide = Object.keys(wasteGuide).length > 0
  const hasContent = hasWasteGuide || cityIsWeesp

  return (
    <Column grow gutter="xl">
      <HorizontalSafeArea flex={1}>
        <Box grow>
          <Column flex={1} gutter="md">
            <StreetAddressWithEditButton address={address.adres} />
            {hasContent ? (
              <WasteGuideForCity address={address} wasteGuide={wasteGuide} />
            ) : (
              <WasteGuideNotFound />
            )}
          </Column>
        </Box>
      </HorizontalSafeArea>
      {hasContent ? (
        <FigureWithFacadesBackground
          height={media.figureHeight.lg}
          Image={<HouseholdWasteToContainerImage />}
          imageAspectRatio={media.illustrationAspectRatio.landscape}
          imageWidth={media.illustrationWidth.wide}
        />
      ) : (
        <FigureWithFacadesBackground
          height={media.figureHeight.lg}
          Image={<WasteGuideNotFoundImage />}
          imageAspectRatio={media.illustrationAspectRatio.portrait}
          imageWidth={media.illustrationWidth.narrow}
          moveUp={isLandscape ? 128 : undefined}
        />
      )}
    </Column>
  )
}
