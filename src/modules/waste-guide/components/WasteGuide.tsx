import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {Address, AddressCity} from '@/modules/address/types'
import {
  HouseholdWasteToContainerImage,
  WasteGuideNotFoundImage,
} from '@/modules/waste-guide/assets/images'
import {WasteGuideForAmsterdam} from '@/modules/waste-guide/components/WasteGuideForAmsterdam'
import {WasteGuideForWeesp} from '@/modules/waste-guide/components/WasteGuideForWeesp'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'

import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useTheme} from '@/themes/useTheme'

type Props = {
  address: Address
}

export const WasteGuide = ({address}: Props) => {
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()
  const {open: openBottomSheet} = useBottomSheet()

  const {bagId, city} = address

  const {data: wasteGuideData, isFetching} = useGetGarbageCollectionAreaQuery({
    bagNummeraanduidingId: bagId,
  })

  if (isFetching || wasteGuideData === undefined) {
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
            gutter="lg">
            <Column>
              <AddressTopTaskButton
                hasTitleIcon
                onPress={openBottomSheet}
                testID="WasteGuideChangeLocationButton"
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
