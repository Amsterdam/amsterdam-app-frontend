import {StackNavigationRoutes} from '@/app/navigation'
import {
  ContactModalParams,
  ContactRouteName,
  ContactStackParams,
} from '@/modules/contact/routes'
import {ContactScreen} from '@/modules/contact/screens'

export const contactScreenConfig: StackNavigationRoutes<
  ContactStackParams,
  ContactRouteName
> = {
  [ContactRouteName.contact]: {
    component: ContactScreen,
    name: ContactRouteName.contact,
    options: {
      headerTitle: 'Contact',
    },
  },
}

export const contactModals: StackNavigationRoutes<ContactModalParams> = {}
