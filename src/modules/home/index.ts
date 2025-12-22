import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const homeModule = createClientModule({
  name: 'HomeModule',
  screenOptions: {
    cardStyleInterpolator: ({current}) => ({
      cardStyle: {
        opacity: current.progress,
      },
    }),
  },
  slug: ModuleSlug.home,
})
