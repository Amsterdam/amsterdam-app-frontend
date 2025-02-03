import {useCallback} from 'react'
import {useOpenMailUrl} from '@/hooks/linking/useOpenMailUrl'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'

export type OpenUrl = (href: string, addAppParams?: boolean) => void

export const useOpenUrl = (): OpenUrl => {
  const openMailUrl = useOpenMailUrl()
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()
  const {trackOutlink} = useTrackEvents()

  return useCallback(
    (href: string, addAppParams = true) => {
      trackOutlink(href)

      if (href.startsWith('mailto:')) {
        const [emailAddress, subject] = href.substring(7).split('?subject=')

        openMailUrl(emailAddress, subject)

        return
      }

      if (href.startsWith('tel:')) {
        openPhoneUrl(href.substring(4))

        return
      }

      openWebUrl(href, addAppParams)
    },
    [openMailUrl, openPhoneUrl, openWebUrl, trackOutlink],
  )
}
