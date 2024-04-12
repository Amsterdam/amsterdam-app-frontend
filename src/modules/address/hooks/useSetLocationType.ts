import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  setLocationType as setLocationTypeAction,
  useLocationType,
} from '@/modules/address/slice'
import {LocationType} from '@/modules/address/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'

/**
 * Hook to set the location type for the address module and log the change to Piwik.
 */
export const useSetLocationType = () => {
  const dispatch = useDispatch()
  const locationType = useLocationType()
  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    logAction: PiwikAction.locationOrAddressSelectionChange,
    logName: 'BottomSheetAddressOrLocationSelect',
  })

  return useCallback(
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
}
