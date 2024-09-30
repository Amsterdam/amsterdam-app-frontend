import {Module} from '@/modules/types'

type Props = {
  enabledModules?: Module[]
}

export const PostRenderComponents = ({enabledModules = []}: Props) =>
  enabledModules.map(({PostRenderComponent, slug}) =>
    PostRenderComponent ? <PostRenderComponent key={slug} /> : null,
  )
