import {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {mijnAmsterdamUserMenuSection} from '@/modules/mijn-amsterdam/utils/userMenuSection'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const mijnAmsterdamModule: ModuleClientConfig = {
  hiddenInMenu: true,
  linking: {
    [MijnAmsterdamRouteName.settings]: 'mijn-amsterdam/:loginResult',
  },
  name: 'MijnAmsterdamModule',
  slug: ModuleSlug['mijn-amsterdam'],
  userMenuSection: mijnAmsterdamUserMenuSection,
}
