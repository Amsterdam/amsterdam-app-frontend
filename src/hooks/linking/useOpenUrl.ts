import {useCallback} from 'react'
import {useOpenMailUrl} from '@/hooks/linking/useOpenMailUrl'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

export type OpenUrl = (href: string) => void

export const useOpenUrl = (): OpenUrl => {
  const openMailUrl = useOpenMailUrl()
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()

  return useCallback(
    (href: string) => {
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
    [openMailUrl, openPhoneUrl, openWebUrl],
  )
}
