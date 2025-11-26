import type {ModuleSlug} from '@/modules/slugs'
import type {ReactNode} from 'react'
import {useGetCachedServerModule} from '@/store/slices/modules'

type Props = {
  FallbackComponent?: ReactNode
  children: ReactNode
  module: ModuleSlug
}

export const RenderIfModuleActive = ({
  FallbackComponent,
  module,
  children,
}: Props) => {
  const {cachedServerModule, isInactive} = useGetCachedServerModule(module)

  if (!cachedServerModule || isInactive) {
    return FallbackComponent ?? null
  }

  return children
}
