import type {ReactNode} from 'react'
import {RenderIfModuleActive} from '@/components/features/RenderIfModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {DynamicForm} from '@/modules/survey/components/DynamicForm'

type Props = {FallbackComponent?: ReactNode; entryPoint: string}

export const Survey = ({entryPoint, FallbackComponent}: Props) => (
  <RenderIfModuleActive
    FallbackComponent={FallbackComponent}
    module={ModuleSlug.survey}>
    <DynamicForm entryPoint={entryPoint} />
  </RenderIfModuleActive>
)
