import {ModuleSlug} from '@/modules/slugs'
import {BaseModuleConfig} from '@/modules/types'

export const module: BaseModuleConfig = {
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
