import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {WasteGuideModuleStackParams} from '../../components/features/modules'
import {NonScalingHeaderTitle} from '../../components/ui'

export const wasteGuideroutes: StackNavigationRoutes<
  WasteGuideModuleStackParams,
  'wasteGuideModule'
> = {
  wasteGuideModule: {
    name: 'WasteGuideModule',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Module afvalwijzer" />,
    },
  },
}
