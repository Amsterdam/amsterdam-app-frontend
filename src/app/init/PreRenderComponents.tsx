import type {ModuleSlug} from '@/modules/slugs'
import {preRenderComponents} from '@/modules/generated/preRenderComponents.generated'
import {clientModules} from '@/modules/modules'
import {Module} from '@/modules/types'

type Props = {
  enabledModules?: Module[]
}

export const PreRenderComponents = ({enabledModules}: Props) => {
  const modulesWithPreRenderComponentBeforeServerModules = clientModules.filter(
    m => m.PreRenderComponent?.renderBeforeServerModules,
  )

  const modules =
    enabledModules ?? modulesWithPreRenderComponentBeforeServerModules
  const moduleSlugs = new Set(modules.map(m => m.slug))

  return (Object.entries(preRenderComponents) as [ModuleSlug, React.FC][])
    .filter(([slug]) => moduleSlugs.has(slug))
    .map(([_, PreRenderComponent]) =>
      PreRenderComponent ? <PreRenderComponent key={_} /> : null,
    )
}
