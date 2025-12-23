import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  ContactModalParams,
  ContactRouteName,
  ContactStackParams,
} from '@/modules/contact/routes'
import {CityOfficeScreen} from '@/modules/contact/screens/CityOffice.screen'
import {ContactScreen} from '@/modules/contact/screens/Contact.screen'

export const screenConfig: StackNavigationRoutes<
  ContactStackParams,
  ContactRouteName
> = {
  [ContactRouteName.cityOffice]: {
    component: CityOfficeScreen,
    name: ContactRouteName.cityOffice,
    options: {
      headerShown: false,
      headerTitle: 'Stadsloketten',
    },
  },
  [ContactRouteName.contact]: {
    component: ContactScreen,
    name: ContactRouteName.contact,
    options: {
      headerTitle: 'Contact',
    },
  },
}

export const modals: StackNavigationRoutes<ContactModalParams> = {}
