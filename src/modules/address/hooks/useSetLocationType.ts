import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  setLocationType as setLocationTypeAction,
  useLocationType,
} from '@/modules/address/slice'
import {LocationType} from '@/modules/address/types'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'

/**
 * Hook to set the location type for the address module and log the change to Piwik.
 */
export const useSetLocationType = () => {
  const dispatch = useDispatch()
  const locationType = useLocationType()
  const {trackCustomEvent} = usePiwik()

  return useCallback(
    (type: LocationType) => {
      dispatch(
        setLocationTypeAction({
          locationType: type,
        }),
      )

      if (locationType !== type) {
        trackCustomEvent(
          'useSetLocationType',
          PiwikAction.locationOrAddressSelectionChange,
          {
            [PiwikDimension.newState]: type,
          },
        )
      }
    },
    [dispatch, locationType, trackCustomEvent],
  )
}
