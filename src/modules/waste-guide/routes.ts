import {StackNavigationRoutes} from '../../app/navigation'
import {WasteGuideModuleStackParams} from '../../components/features/modules'

export const routes: StackNavigationRoutes<
  WasteGuideModuleStackParams,
  'wasteGuideModule'
> = {
  wasteGuideModule: {
    name: 'WasteGuideModule',
  },
}
