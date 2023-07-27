import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const welcomeModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'WelcomeModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
  slug: ModuleSlug.welcome,
}
