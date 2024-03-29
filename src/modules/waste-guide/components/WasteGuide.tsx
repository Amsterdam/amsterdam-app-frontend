import {skipToken} from '@reduxjs/toolkit/dist/query'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {WasteGuideFigure} from '@/components/ui/media/errors/WasteGuideFigure'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useIsFocusedOrNotAndroid} from '@/hooks/useIsFocusedOrNotAndroid'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {AddressCity} from '@/modules/address/types'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'
import WasteGuideNotFoundImage from '@/modules/waste-guide/assets/images/waste-guide-not-found.svg'
import {WasteGuideForAmsterdam} from '@/modules/waste-guide/components/WasteGuideForAmsterdam'
import {WasteGuideForWeesp} from '@/modules/waste-guide/components/WasteGuideForWeesp'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {useTheme} from '@/themes/useTheme'

export const WasteGuide = () => {
  const navigation = useNavigation<WasteGuideRouteName>()
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()
  const {
    address,
    isFetching: selectedAddressForWasteGuideIsFetching,
    hasValidAddress,
  } = useSelectedAddress()

  const isFocusedOrNotAndroid = useIsFocusedOrNotAndroid()

  const {
    data: wasteGuideData,
    error,
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
    selectedAddressForWasteGuideIsFetching ||
    !hasValidAddress
  ) {
    return (
      <Column
        grow
        gutter="xl">
        <HorizontalSafeArea flex={1}>
          <Box grow>
            <Column
              flex={1}
              gutter="lg">
              <Column gutter="md">
                {!getGarbageCollectionAreaQueryIsFetching &&
                  !selectedAddressForWasteGuideIsFetching && (
                    <Title text="Voor welke locatie wilt u informatie over afval?" />
                  )}
                <ShareLocationTopTaskButton testID="WasteGuide" />
              </Column>
              {!!getGarbageCollectionAreaQueryIsFetching && (
                <PleaseWait testID="WasteGuideLoadingSpinner" />
              )}
            </Column>
          </Box>
        </HorizontalSafeArea>
        <FigureWithFacadesBackground
          height={media.figureHeight.lg}
          Image={<HouseholdWasteToContainerImage />}
          imageAspectRatio={media.illustrationAspectRatio.landscape}
          imageWidth={media.illustrationWidth.wide}
          moveUp={isLandscape ? 128 : undefined}
          testID="WasteGuideRequestLocationBackground"
        />
      </Column>
    )
  }

  if (getGarbageCollectionAreaQueryIsError || !wasteGuideData || !address) {
    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={error}
        Image={WasteGuideFigure}
        onPress={() => navigation.goBack()}
        testProps={{
          testID: 'WasteGuideErrorScreen',
        }}
        text="Probeer het later nog een keer."
        title="Helaas is de afvalwijzer nu niet beschikbaar">
        <ShareLocationTopTaskButton testID="WasteGuide" />
      </FullScreenError>
    )
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
              <ShareLocationTopTaskButton testID="WasteGuide" />
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
          testID="WasteGuideBackground"
        />
      ) : (
        <FigureWithFacadesBackground
          height={media.figureHeight.lg}
          Image={<WasteGuideNotFoundImage />}
          imageAspectRatio={media.illustrationAspectRatio.portrait}
          imageWidth={media.illustrationWidth.narrow}
          moveUp={isLandscape ? 128 : undefined}
          testID="WasteGuideNotFoundBackground"
        />
      )}
    </Column>
  )
}
