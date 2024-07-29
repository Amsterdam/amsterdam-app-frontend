import {useModules} from '@/hooks/useModules'
import {clientModules} from '@/modules/modules'

export const ModuleHeaderComponents = () => {
  const {enabledModules, modulesLoading, modulesError} = useModules()

  const modules =
    modulesLoading || modulesError ? clientModules : enabledModules

  return (
    modules?.map(({HeaderComponent, slug}) =>
      HeaderComponent ? <HeaderComponent key={slug} /> : null,
    ) ?? null
  )
}
