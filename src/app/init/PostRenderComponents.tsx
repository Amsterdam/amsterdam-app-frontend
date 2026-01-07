import {postRenderComponents} from '@/modules/generated/postRenderComponents.generated'
import {Module} from '@/modules/types'
import {mergeComponentsWithEnabledModules} from '@/utils/mergeComponentsWithEnabledModules'

type Props = {
  enabledModules?: Module[]
}

/**
 * Component to render after the modules have been rendered.
 */
export const PostRenderComponents = ({enabledModules = []}: Props) =>
  mergeComponentsWithEnabledModules(postRenderComponents, enabledModules)
