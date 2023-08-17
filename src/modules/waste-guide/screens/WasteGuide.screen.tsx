import {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Alert} from '@/components/ui/feedback/Alert'
import {Screen} from '@/components/ui/layout/Screen'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {SelectLocationTypeBottomSheet} from '@/modules/address/components/location/SelectLocationTypeBottomSheet'
import {RequestLocation} from '@/modules/waste-guide/components/RequestLocation'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {useLocationType} from '@/modules/waste-guide/hooks/useLocationType'
import {setLocationType} from '@/modules/waste-guide/slice'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()
  const locationType = useLocationType()
  const dispatch = useDispatch()
  const onSelectAddress = useCallback(
    () => dispatch(setLocationType('address')),
    [dispatch],
  )
  const onSelectLocation = useCallback(
    () => dispatch(setLocationType('location')),
    [dispatch],
  )

  return (
    <Screen
      scroll={!!locationType}
      stickyFooter={
        <SelectLocationTypeBottomSheet
          onSelectAddress={onSelectAddress}
          onSelectLocation={onSelectLocation}
        />
      }
      stickyHeader={<Alert />}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      {locationType ? <WasteGuide /> : <RequestLocation />}
    </Screen>
  )
}
