import {StackNavigationRoutes} from '@/app/navigation'
import {
  ContactModalParams,
  ContactRouteName,
  ContactStackParams,
} from '@/modules/contact/routes'
import {
  ContactFormScreen,
  ContactScreen,
  MakeAppointmentScreen,
} from '@/modules/contact/screens'

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
  [ContactRouteName.contactForm]: {
    component: ContactFormScreen,
    name: ContactRouteName.contactForm,
    options: {
      headerTitle: 'Neem contact op',
    },
  },
  [ContactRouteName.makeAppointment]: {
    component: MakeAppointmentScreen,
    name: ContactRouteName.makeAppointment,
    options: {
      headerTitle: 'Maak een afspraak',
    },
  },
}

export const contactModals: StackNavigationRoutes<ContactModalParams> = {}
