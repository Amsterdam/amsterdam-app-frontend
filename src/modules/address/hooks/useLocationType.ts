import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectLocationType,
  setLocationType as setLocationTypeAction,
} from '@/modules/address/slice'
import {LocationType} from '@/modules/address/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'

export const useLocationType = () => {
  const dispatch = useDispatch()
  const locationType = useSelector(selectLocationType)
  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    logAction: PiwikAction.locationOrAddressSelectionChange,
    logName: 'BottomSheetAddressOrLocationSelect',
  })

  const setLocationType = useCallback(
    (type: LocationType) => {
      dispatch(
        setLocationTypeAction({
          locationType: type,
        }),
      )

      if (locationType !== type) {
        onEvent(undefined, {
          dimensions: {
            [PiwikDimension.newState]: type,
          },
        })
      }
    },
    [dispatch, locationType, onEvent],
  )

  return {locationType, setLocationType}
}
