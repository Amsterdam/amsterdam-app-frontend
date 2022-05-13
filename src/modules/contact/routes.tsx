import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type ContactStackParams = {
  ContactHome: undefined
}

export const contactRoutes: StackNavigationRoutes<ContactStackParams, 'home'> =
  {
    home: {
      name: 'ContactHome',
      options: {
        headerTitle: () => <NonScalingHeaderTitle text="Vragen" />,
      },
    },
  }
