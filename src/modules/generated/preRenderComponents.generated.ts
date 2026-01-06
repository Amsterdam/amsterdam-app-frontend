import {PreRenderComponent as preRenderComponents0} from '@/modules/construction-work/PreRenderComponent.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const preRenderComponents = {
  [ModuleSlug['construction-work']]: preRenderComponents0,
} satisfies Partial<
  Record<
    ModuleSlug,
    React.ComponentType & {renderBeforeServerModules?: boolean}
  >
>
