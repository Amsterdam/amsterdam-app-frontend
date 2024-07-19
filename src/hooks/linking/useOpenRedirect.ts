import {useCallback} from 'react'
import {Alert} from 'react-native'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {RedirectKey} from '@/modules/redirects/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const useOpenRedirect = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  return useCallback(
    (redirectKey: RedirectKey) => {
      if (redirectUrls?.[redirectKey]) {
        openWebUrl(redirectUrls[redirectKey])
      } else {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        trackException(ExceptionLogKey.redirectNotFound, 'Redirects.tsx', {
          urlKey: redirectKey,
        })
      }
    },
    [openWebUrl, redirectUrls, trackException],
  )
}
