import {PostRenderComponent as postRenderComponents0} from '@/modules/chat/PostRenderComponent.tsx'
import {ModuleSlug} from '@/modules/slugs'

export const postRenderComponents = {
  [ModuleSlug.chat]: postRenderComponents0,
} satisfies Partial<Record<ModuleSlug, React.ComponentType>>
