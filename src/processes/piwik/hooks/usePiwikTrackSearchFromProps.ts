import {TrackSearchOptions} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {useCallback} from 'react'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {ReplaceCustomDimensions} from '@/processes/piwik/types'

type Props<T> = {
  keyword: string
  onEvent?: ((event: T) => void) | (() => void)
  options?: ReplaceCustomDimensions<TrackSearchOptions>
}

export const usePiwikTrackSearchFromProps = <T = unknown>({
  keyword,
  options,
  onEvent,
}: Props<T>) => {
  const {trackSearch} = useTrackEvents()

  return useCallback(
    (event: T) => {
      onEvent?.(event)
      trackSearch(keyword, options)
    },
    [keyword, options, onEvent, trackSearch],
  )
}
