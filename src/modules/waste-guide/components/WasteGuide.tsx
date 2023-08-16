import {skipToken} from '@reduxjs/toolkit/dist/query'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {AddressCity} from '@/modules/address/types'
import {
  HouseholdWasteToContainerImage,
  WasteGuideNotFoundImage,
} from '@/modules/waste-guide/assets/images'
import {WasteGuideForAmsterdam} from '@/modules/waste-guide/components/WasteGuideForAmsterdam'
import {WasteGuideForWeesp} from '@/modules/waste-guide/components/WasteGuideForWeesp'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {useWasteGuideLocationInfo} from '@/modules/waste-guide/hooks/useWasteGuideLocationInfo'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {useTheme} from '@/themes/useTheme'

export const WasteGuide = () => {
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()
  const {open: openBottomSheet} = useBottomSheet()
  const {locationType, selectedAddress} = useWasteGuideLocationInfo()

  const {data: wasteGuideData, isFetching} = useGetGarbageCollectionAreaQuery(
    selectedAddress?.bagId
      ? {bagNummeraanduidingId: selectedAddress.bagId}
      : skipToken,
  )

  if (!selectedAddress) {
    return <SomethingWentWrong />
  }

  if (isFetching || wasteGuideData === undefined) {
    return <PleaseWait />
  }

  const {city} = selectedAddress
  const cityIsWeesp = city === AddressCity.Weesp
  const WasteGuideForCity = cityIsWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam
  const hasContent = Object.keys(wasteGuideData).length > 0 || cityIsWeesp

  const AddressOrLocationTopTaskButton =
    locationType === 'address' ? AddressTopTaskButton : LocationTopTaskButton

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
              <AddressOrLocationTopTaskButton
                hasTitleIcon
                onPress={openBottomSheet}
                showAddress
                testID="WasteGuideChangeLocationButton"
              />
            </Column>
            {hasContent ? (
              <WasteGuideForCity wasteGuide={wasteGuideData} />
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
