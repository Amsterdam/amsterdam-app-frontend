import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ContactModalParams,
  ContactRouteName,
  ContactStackParams,
} from '@/modules/contact/routes'
import {ContactScreen} from '@/modules/contact/screens/Contact.screen'

export const screenConfig: StackNavigationRoutes<
  ContactStackParams,
  ContactRouteName
> = {
  [ContactRouteName.contact]: {
    component: ContactScreen,
    name: ContactRouteName.contact,
    options: {
      headerTitle: 'Contact',
      header: () => null,
    },
  },
}

export const contactModals: StackNavigationRoutes<ContactModalParams> = {}
