import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const welcomeModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'WelcomeModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        opacity: current.progress,
      },
    }),
  },
  slug: ModuleSlug.welcome,
}
