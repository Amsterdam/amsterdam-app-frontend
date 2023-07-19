import {useOpenMailUrl, useOpenPhoneUrl, useOpenWebUrl} from '@/hooks'

export type OpenUrl = (href: string) => void

export const useOpenUrl = (): OpenUrl => {
  const openMailUrl = useOpenMailUrl()
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()

  return (href: string) => {
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
  }
}
