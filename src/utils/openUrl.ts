import {openMailUrl} from '@/utils/openMailUrl'
import {openPhoneUrl} from '@/utils/openPhoneUrl'
import {openWebUrl} from '@/utils/openWebUrl'

export const openUrl = (href: string) => {
  if (href.startsWith('mailto:')) {
    const [mailto, subject] = href.split('?subject=')
    const [, emailAddress] = mailto.split(':')
    void openMailUrl(emailAddress, subject)
    return
  }
  if (href.startsWith('tel:')) {
    void openPhoneUrl(href)
    return
  }
  void openWebUrl(href)
}
