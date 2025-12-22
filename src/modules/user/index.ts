import {ModuleSlug} from '@/modules/slugs'
import {createCoreModule} from '@/modules/utils/createModule'

export const userModule = createCoreModule({
  name: 'UserModule',
  slug: ModuleSlug.user,
})
