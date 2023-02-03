import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  isCore: true,
  linking: {},
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
  state: [],
}
