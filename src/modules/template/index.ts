import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

// TODO Add to `clientModules` in `/src/modules/index.ts`.
// TODO Add `Stack` to `/src/modules/stacks.ts`.
export const module: ModuleClientConfig = {
  name: 'TemplateModule',
  slug: ModuleSlug.home,
}
