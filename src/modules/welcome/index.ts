import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  hiddenInMenu: true,
  linking: {},
  name: 'WelcomeModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
  slug: ModuleSlug.welcome,
  state: [],
}
