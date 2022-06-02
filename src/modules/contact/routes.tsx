import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

export enum ContactRouteName {
  home = 'Home',
}

export type ContactStackParams = {
  [ContactRouteName.home]: undefined
}

export const contactRoutes: StackNavigationRoutes<
  ContactStackParams,
  ContactRouteName
> = {
  [ContactRouteName.home]: {
    name: ContactRouteName.home,
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Vragen" />,
    },
  },
}
