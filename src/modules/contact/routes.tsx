import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'
import {ContactScreen} from './Screen'

export enum ContactRouteName {
  contact = 'Contact',
}

export type ContactStackParams = {
  [ContactRouteName.contact]: undefined
}

export const contactRoutes: StackNavigationRoutes<
  ContactStackParams,
  ContactRouteName
> = {
  [ContactRouteName.contact]: {
    component: ContactScreen,
    name: ContactRouteName.contact,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Vragen" />,
    },
  },
}
