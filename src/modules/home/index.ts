import {ModuleSlug} from '@/modules/slugs'
import {CoreModuleConfig} from '@/modules/types'

export const homeModule: CoreModuleConfig = {
  name: 'HomeModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        opacity: current.progress,
      },
    }),
  },
  slug: ModuleSlug.home,
}
