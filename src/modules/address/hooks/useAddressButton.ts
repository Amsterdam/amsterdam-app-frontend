import {useCallback} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useGetLocationType} from '@/modules/address/hooks/useGetLocationType'
import {AddressModalName} from '@/modules/address/routes'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const useAddressButton = () => {
  const {navigate} = useNavigation<AddressModalName>()
  const address = useAddress()
  const {close: closeBottomSheet} = useBottomSheet()
  const {setLocationType, locationType} = useGetLocationType()

  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    logAction: PiwikAction.locationOrAddressSelectionChange,
    logName: 'BottomSheetAddressOrLocationSelect',
  })

  const onPressAddressButton = useCallback(() => {
    setLocationType('address')

    if (locationType && locationType !== 'address') {
      onEvent(undefined, {
        dimensions: {
          [PiwikDimension.newState]: 'address',
        },
      })
    }

    if (!address) {
      navigate(AddressModalName.addressForm)

      return
    }

    closeBottomSheet()
  }, [
    address,
    closeBottomSheet,
    locationType,
    navigate,
    onEvent,
    setLocationType,
  ])

  return {
    onPress: onPressAddressButton,
  }
}
