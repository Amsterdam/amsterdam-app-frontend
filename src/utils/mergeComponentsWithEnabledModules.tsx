import type {ModuleSlug} from '@/modules/slugs'
import type {ComponentType} from 'react'
import {Module} from '@/modules/types'

export type FilterFunction<T extends ComponentType> = (
  slug: ModuleSlug,
  enabledModuleSlugs: Set<ModuleSlug>,
  Component: T,
) => boolean

export const defaultFilterFunction = <T extends ComponentType>(
  slug: ModuleSlug,
  enabledModuleSlugs: Set<ModuleSlug>,
  _Component: T,
) => enabledModuleSlugs?.has(slug)

export const mergeComponentsWithEnabledModules = <T extends ComponentType>(
  components: Partial<Record<ModuleSlug, T>>,
  enabledModules: Module[] = [],
  filter: FilterFunction<T> = defaultFilterFunction,
) => {
  const moduleSlugs = new Set(enabledModules?.map(m => m.slug))

  return (Object.entries(components) as [ModuleSlug, T][])
    .filter(([slug, Component]) => filter(slug, moduleSlugs, Component))
    .map(([slug, Component]: [ModuleSlug, ComponentType]) =>
      Component ? <Component key={slug} /> : null,
    )
}
