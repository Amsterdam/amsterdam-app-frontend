import {openMailUrl} from '@/utils/openMailUrl'
import {openPhoneUrl} from '@/utils/openPhoneUrl'
import {openWebUrl} from '@/utils/openWebUrl'

export const openUrl = (href: string) => {
  if (href.startsWith('mailto:')) {
    openMailUrl(href)
  }
  if (href.startsWith('tel:')) {
    openPhoneUrl(href)
  }
  void openWebUrl(href)
}
