import React from 'react'
import {StackNavigationRoutes} from '../../app/navigation'
import {NonScalingHeaderTitle} from '../../components/ui'

type WasteGuideStackParams = {
  WasteGuide: undefined
}

export const wasteGuideRoutes: StackNavigationRoutes<
  WasteGuideStackParams,
  'wasteGuide'
> = {
  wasteGuide: {
    name: 'WasteGuide',
    options: {
      headerTitle: () => <NonScalingHeaderTitle text="Afvalwijzer" />,
    },
  },
}
