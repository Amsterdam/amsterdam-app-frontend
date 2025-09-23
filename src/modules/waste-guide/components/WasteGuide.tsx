import {skipToken} from '@reduxjs/toolkit/query'
import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsFocusedAndroid} from '@/hooks/useIsFocusedAndroid'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {AddressCity} from '@/modules/address/types'
import {WasteGuideContent} from '@/modules/waste-guide/components/WasteGuideContent'
import {WasteGuideFigure} from '@/modules/waste-guide/components/WasteGuideFigure'
import {WasteGuideFullScreenError} from '@/modules/waste-guide/components/WasteGuideFullScreenError'
import {WasteGuideNoAddress} from '@/modules/waste-guide/components/WasteGuideNoAddress'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {WasteCardButton} from '@/modules/waste-guide/components/waste-card/WasteCardButton'
import {useGetWasteGuideQuery} from '@/modules/waste-guide/service'
import {selectIsInternetReachable} from '@/store/slices/internetConnection'

export const WasteGuide = () => {
  const {
    address,
    isFetching: isFetchingAddress,
    hasValidAddress,
  } = useSelectedAddress()

  const isFocusedAndroid = useIsFocusedAndroid()

  const {
    data: wasteGuide,
    error,
    isError: getWasteGuideIsError,
    isFetching: isFetchingWasteGuide,
  } = useGetWasteGuideQuery(
    // isFocusedOrNotAndroid: on Android we delay the request until the screen is in focus, to prevent a double content rendering issue
    address?.bagId && isFocusedAndroid ? address.bagId : skipToken,
  )
  const isInternetReachable = useSelector(selectIsInternetReachable)

  if (isFetchingWasteGuide || isFetchingAddress || !hasValidAddress) {
    return (
      <WasteGuideNoAddress
        isFetchingAddress={isFetchingAddress}
        isFetchingWasteGuide={isFetchingWasteGuide}
      />
    )
  }

  if (getWasteGuideIsError || !wasteGuide || !address) {
    if (isInternetReachable === false) {
      return <NoInternetErrorFullScreen />
    }

    return <WasteGuideFullScreenError error={error} />
  }

  const {city} = address
  const cityIsWeesp = city === AddressCity.Weesp
  const hasContent = Object.keys(wasteGuide).length > 0 || cityIsWeesp

  return (
    <Column
      grow={1}
      gutter="xl">
      <HorizontalSafeArea flex={1}>
        <Box grow>
          <Column
            flex={1}
            gutter="lg">
            <Column gutter="md">
              <ShareLocationTopTaskButton testID="WasteGuideRequestLocationButton" />
              <WasteCardButton />
            </Column>
            {hasContent ? (
              <WasteGuideContent
                bagId={address.bagId}
                wasteGuide={wasteGuide}
              />
            ) : (
              <WasteGuideNotFound />
            )}
          </Column>
        </Box>
      </HorizontalSafeArea>
      <WasteGuideFigure hasContent={hasContent} />
    </Column>
  )
}
