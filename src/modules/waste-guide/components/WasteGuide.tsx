import {useContext} from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {FigureWithFacadesBackground} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {Address, AddressCity} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {
  HouseholdWasteToContainerImage,
  WasteGuideNotFoundImage,
} from '@/modules/waste-guide/assets/images'
import {
  WasteGuideForWeesp,
  WasteGuideForAmsterdam,
  WasteGuideNotFound,
} from '@/modules/waste-guide/components'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

type Props = {
  address: Address
}

export const WasteGuide = ({address}: Props) => {
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()

  const {addressLine1, bagId, city} = address

  const {data: wasteGuideData, isLoading} = useGetGarbageCollectionAreaQuery({
    bagNummeraanduidingId: bagId,
  })

  if (isLoading || wasteGuideData === undefined) {
    return <PleaseWait />
  }

  const cityIsWeesp = city === AddressCity.Weesp
  const WasteGuideForCity = cityIsWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam
  const hasWasteGuide = Object.keys(wasteGuideData).length > 0
  const hasContent = hasWasteGuide || cityIsWeesp

  return (
    <Column
      grow
      gutter="xl">
      <HorizontalSafeArea flex={1}>
        <Box grow>
          <Column
            flex={1}
            gutter="xl">
            <Column>
              <Paragraph>Afvalinformatie voor dit adres</Paragraph>
              <StreetAddressWithEditButton
                address={addressLine1}
                testIDButton="WasteGuideButtonEditAddress"
                testIDLabel="WasteGuideTextAddress"
              />
            </Column>
            {hasContent ? (
              <WasteGuideForCity
                address={address}
                wasteGuide={wasteGuideData}
              />
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
