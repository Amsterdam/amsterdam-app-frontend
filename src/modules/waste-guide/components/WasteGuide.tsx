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
import {useGetWasteGuideQuery} from '@/modules/waste-guide/service'

export const WasteGuide = () => {
  const navigation = useNavigation<WasteGuideRouteName>()
  const {
    address,
    isFetching: isFetchingAddress,
    hasValidAddress,
  } = useSelectedAddress()

  const isFocusedOrNotAndroid = useIsFocusedOrNotAndroid()

  const {
    data: wasteGuide,
    error,
    isError: getWasteGuideIsError,
    isFetching: isFetchingWasteGuide,
  } = useGetWasteGuideQuery(
    // isFocusedOrNotAndroid: on Android we delay the request until the screen is in focus, to prevent a double content rendering issue
    address?.bagId && isFocusedOrNotAndroid
      ? {bagNummeraanduidingId: address.bagId}
      : skipToken,
  )

  if (isFetchingWasteGuide || isFetchingAddress || !hasValidAddress) {
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
                {!isFetchingWasteGuide && !isFetchingAddress && (
                  <Title text="Voor welke locatie wilt u informatie over afval?" />
                )}
                <ShareLocationTopTaskButton testID="WasteGuide" />
              </Column>
              {!!isFetchingWasteGuide && (
                <PleaseWait testID="WasteGuideLoadingSpinner" />
              )}
            </Column>
          </Box>
        </HorizontalSafeArea>
        <FigureWithFacadesBackground testID="WasteGuideRequestLocationBackground">
          <HouseholdWasteToContainerImage />
        </FigureWithFacadesBackground>
      </Column>
    )
  }

  if (getWasteGuideIsError || !wasteGuide || !address) {
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
  const hasContent = Object.keys(wasteGuide).length > 0 || cityIsWeesp

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
              <WasteGuideForCity wasteGuide={wasteGuide} />
            ) : (
              <WasteGuideNotFound />
            )}
          </Column>
        </Box>
      </HorizontalSafeArea>
      {hasContent ? (
        <FigureWithFacadesBackground testID="WasteGuideBackground">
          <HouseholdWasteToContainerImage />
        </FigureWithFacadesBackground>
      ) : (
        <FigureWithFacadesBackground
          illustrationAspectRatio="portrait"
          testID="WasteGuideNotFoundBackground">
          <WasteGuideNotFoundImage />
        </FigureWithFacadesBackground>
      )}
    </Column>
  )
}
