import {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {mijnAmsterdamUserMenuSection} from '@/modules/mijn-amsterdam/utils/userMenuSection'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const mijnAmsterdamModule = createClientModule({
  hiddenInMenu: true,
  linking: {
    [MijnAmsterdamRouteName.settings]: 'mijn-amsterdam/:loginResult',
  },
  name: 'MijnAmsterdamModule',
  requiresFirebaseToken: true,
  slug: ModuleSlug['mijn-amsterdam'],
  userMenuSection: mijnAmsterdamUserMenuSection,
})
