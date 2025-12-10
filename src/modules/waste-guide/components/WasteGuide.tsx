import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {useSelector} from '@/hooks/redux/useSelector'
import {AddressCity} from '@/modules/address/types'
import {WasteGuideContent} from '@/modules/waste-guide/components/WasteGuideContent'
import {WasteGuideFullScreenError} from '@/modules/waste-guide/components/WasteGuideFullScreenError'
import {WasteGuideNoAddress} from '@/modules/waste-guide/components/WasteGuideNoAddress'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {WasteGuideRequestLocationButton} from '@/modules/waste-guide/components/WasteGuideRequestLocationButton'
import {WasteCardButton} from '@/modules/waste-guide/components/waste-card/WasteCardButton'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {selectIsInternetReachable} from '@/store/slices/internetConnection'

export const WasteGuide = () => {
  const {
    address,
    error,
    getWasteGuideIsError,
    hasValidAddress,
    isFetchingAddress,
    isFetchingWasteGuide,
    wasteGuide,
  } = useGetWasteGuide()
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
  const hasContent = wasteGuide.waste_types.length > 0 || cityIsWeesp

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
              <WasteGuideRequestLocationButton />
              <WasteCardButton />
            </Column>
            {hasContent ? <WasteGuideContent /> : <WasteGuideNotFound />}
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  )
}
