import {ContactScreen} from './Screen'
import {ContactRouteName, ContactStackParams} from './routes'
import {StackNavigationRoutes} from '@/app/navigation'

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
