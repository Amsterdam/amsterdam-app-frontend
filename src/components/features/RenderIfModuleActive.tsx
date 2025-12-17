import type {ModuleSlug} from '@/modules/slugs'
import type {ReactNode} from 'react'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'

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
  const isActive = useIsModuleActive(module)

  if (!isActive) {
    return FallbackComponent ?? null
  }

  return children
}
