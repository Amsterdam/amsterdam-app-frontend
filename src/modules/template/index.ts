import {ModuleSlug} from '../slugs'
import {ModuleClientConfig} from '../types'

// TODO Add to `clientModules` in `/src/modules/index.ts`.
// TODO Add `Stack` to `/src/modules/stacks.ts`
export const module: ModuleClientConfig = {
  linking: {},
  name: 'TemplateModule',
  slug: ModuleSlug.home,
  state: [],
}
