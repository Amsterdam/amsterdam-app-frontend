import {skipToken} from '@reduxjs/toolkit/query'
import {useIsFocusedAndroid} from '@/hooks/useIsFocusedAndroid'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {useGetWasteGuideQuery} from '@/modules/waste-guide/service'
import {ReduxKey} from '@/store/types/reduxKey'

export const useGetWasteGuide = () => {
  const {
    address,
    isFetchingLocation: isFetchingAddress,
    hasValidAddress,
  } = useModuleBasedSelectedAddress(ReduxKey.wasteGuide)

  const isFocusedAndroid = useIsFocusedAndroid()

  const {
    data,
    error,
    isError: getWasteGuideIsError,
    isFetching: isFetchingWasteGuide,
  } = useGetWasteGuideQuery(
    // isFocusedOrNotAndroid: on Android we delay the request until the screen is in focus, to prevent a double content rendering issue
    address?.bagId && isFocusedAndroid ? address.bagId : skipToken,
  )

  return {
    address,
    error,
    getWasteGuideIsError,
    hasValidAddress,
    isFetchingWasteGuide,
    isFetchingAddress,
    isLoading: isFetchingWasteGuide || isFetchingAddress,
    wasteGuide: data,
  }
}
