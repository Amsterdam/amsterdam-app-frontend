import {useCallback} from 'react'
import {useOpenMailUrl} from '@/hooks/linking/useOpenMailUrl'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'

export type OpenUrl = (href: string) => void

export const useOpenUrl = (): OpenUrl => {
  const openMailUrl = useOpenMailUrl()
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()
  const {trackOutlink} = usePiwik()

  return useCallback(
    (href: string) => {
      trackOutlink(href)

      if (href.startsWith('mailto:')) {
        const [mailto, subject] = href.split('?subject=')
        const [, emailAddress] = mailto.split(':')

        openMailUrl(emailAddress, subject)

        return
      }

      if (href.startsWith('tel:')) {
        openPhoneUrl(href)

        return
      }

      openWebUrl(href)
    },
    [openMailUrl, openPhoneUrl, openWebUrl, trackOutlink],
  )
}
