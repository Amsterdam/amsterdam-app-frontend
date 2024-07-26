import {useMemo} from 'react'
import {useModules} from '@/hooks/useModules'
import {clientModules} from '@/modules/modules'

export const ModuleHeaderComponents = () => {
  const {enabledModules, modulesLoading, modulesError} = useModules()

  const modules = useMemo(() => {
    if (modulesLoading || modulesError) {
      return clientModules
    }

    return enabledModules
  }, [enabledModules, modulesError, modulesLoading])

  return (
    modules?.map(({HeaderComponent, slug}) =>
      HeaderComponent ? <HeaderComponent key={slug} /> : null,
    ) ?? null
  )
}
