import {skipToken} from '@reduxjs/toolkit/dist/query'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useIsFocusedOrNotAndroid} from '@/hooks/useIsFocusedOrNotAndroid'
import {ChangeLocationButton} from '@/modules/address/components/location/ChangeLocationButton'
import {AddressCity} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {
  HouseholdWasteToContainerImage,
  WasteGuideNotFoundImage,
} from '@/modules/waste-guide/assets/images'
import {WasteGuideForAmsterdam} from '@/modules/waste-guide/components/WasteGuideForAmsterdam'
import {WasteGuideForWeesp} from '@/modules/waste-guide/components/WasteGuideForWeesp'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {useSelectedAddressForWasteGuide} from '@/modules/waste-guide/hooks/useSelectedAddressForWasteGuide'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {useTheme} from '@/themes/useTheme'

export const WasteGuide = () => {
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()
  const {
    address,
    isError: selectedAddressForWasteGuideIsError,
    isFetching: selectedAddressForWasteGuideIsFetching,
  } = useSelectedAddressForWasteGuide()

  const isFocusedOrNotAndroid = useIsFocusedOrNotAndroid()

  const {
    data: wasteGuideData,
    isError: getGarbageCollectionAreaQueryIsError,
    isFetching: getGarbageCollectionAreaQueryIsFetching,
  } = useGetGarbageCollectionAreaQuery(
    // isFocusedOrNotAndroid: on Android we delay the request until the screen is in focus, to prevent a double content rendering issue
    address?.bagId && isFocusedOrNotAndroid
      ? {bagNummeraanduidingId: address.bagId}
      : skipToken,
  )

  if (
    getGarbageCollectionAreaQueryIsFetching ||
    selectedAddressForWasteGuideIsFetching
  ) {
    return <PleaseWait />
  }

  if (
    getGarbageCollectionAreaQueryIsError ||
    selectedAddressForWasteGuideIsError ||
    !wasteGuideData ||
    !address
  ) {
    return <SomethingWentWrong />
  }

  const {city} = address
  const cityIsWeesp = city === AddressCity.Weesp
  const WasteGuideForCity = cityIsWeesp
    ? WasteGuideForWeesp
    : WasteGuideForAmsterdam
  const hasContent = Object.keys(wasteGuideData).length > 0 || cityIsWeesp

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
              <ChangeLocationButton
                slug={ModuleSlug['waste-guide']}
                testID="WasteGuide"
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
