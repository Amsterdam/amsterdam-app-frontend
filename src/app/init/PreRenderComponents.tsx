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

  return modules.map(({PreRenderComponent, slug}) =>
    PreRenderComponent ? <PreRenderComponent key={slug} /> : null,
  )
}
