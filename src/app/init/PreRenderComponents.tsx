import type {ModuleSlug} from '@/modules/slugs'
import type {ComponentType} from 'react'
import {preRenderComponents} from '@/modules/generated/preRenderComponents.generated'
import {Module} from '@/modules/types'

type Props = {
  enabledModules?: Module[]
}

/**
 * Renders all PreRenderComponents, components for preprocessing purposes at the app's root level.
 * If `renderBeforeServerModules` is true, the component will be rendered before the server modules are fetched.
 */
export const PreRenderComponents = ({enabledModules}: Props) => {
  const moduleSlugs = new Set(enabledModules?.map(m => m.slug))

  return (
    Object.entries(preRenderComponents) as [
      ModuleSlug,
      ComponentType & {
        renderBeforeServerModules?: boolean
      },
    ][]
  )
    .filter(([slug, PreRenderComponent]) =>
      moduleSlugs
        ? moduleSlugs.has(slug)
        : PreRenderComponent?.renderBeforeServerModules,
    )
    .map(([_, PreRenderComponent]) =>
      PreRenderComponent ? <PreRenderComponent key={_} /> : null,
    )
}
