import {useModules} from '@/hooks/useModules'

export const ModuleHeaderComponents = () => {
  const {enabledModules} = useModules()

  return (
    enabledModules?.map(({HeaderComponent, slug}) =>
      HeaderComponent ? <HeaderComponent key={slug} /> : null,
    ) ?? null
  )
}
