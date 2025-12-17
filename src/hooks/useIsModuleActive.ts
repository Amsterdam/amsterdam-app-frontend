import type {ModuleSlug} from '@/modules/slugs'
import {useGetCachedServerModule} from '@/store/slices/modules'

export const useIsModuleActive = (module: ModuleSlug) => {
  const {cachedServerModule, isInactive} = useGetCachedServerModule(module)

  return Boolean(cachedServerModule && !isInactive)
}
