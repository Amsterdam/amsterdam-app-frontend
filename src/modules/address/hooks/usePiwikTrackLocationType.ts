import {useCallback} from 'react'
import {LocationType} from '@/modules/address/types'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

/**
 * Hook to log the change of locationType to Piwik.
 */
export const usePiwikTrackLocationType = () => {
  const {trackCustomEvent} = useTrackEvents()

  return useCallback(
    (
      newType: LocationType,
      oldType?: LocationType,
      module: ReduxKey = ReduxKey.address,
    ) => {
      if (oldType !== newType) {
        trackCustomEvent(
          'useSetLocationType',
          PiwikAction.locationOrAddressSelectionChange,
          {
            [PiwikDimension.newState]: `${module}: ${newType}`,
          },
        )
      }
    },
    [trackCustomEvent],
  )
}
