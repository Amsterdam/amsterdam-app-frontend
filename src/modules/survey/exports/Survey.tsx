import type {ReactNode} from 'react'
import {RenderIfModuleActive} from '@/components/features/RenderIfModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {KTOForm, type KTOFormProps} from '@/modules/survey/components/KTOForm'

type Props = {FallbackComponent?: ReactNode} & KTOFormProps

export const Survey = ({FallbackComponent, ...props}: Props) => (
  <RenderIfModuleActive
    FallbackComponent={FallbackComponent}
    module={ModuleSlug.survey}>
    <KTOForm {...props} />
  </RenderIfModuleActive>
)
