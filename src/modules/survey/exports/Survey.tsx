import type {ReactNode} from 'react'
import {RenderIfModuleActive} from '@/components/features/RenderIfModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {
  DynamicSurveyForm,
  type DynamicSurveyFormProps,
} from '@/modules/survey/components/DynamicSurveyForm'

type Props = {FallbackComponent?: ReactNode} & DynamicSurveyFormProps

export const Survey = ({FallbackComponent, ...props}: Props) => (
  <RenderIfModuleActive
    FallbackComponent={FallbackComponent}
    module={ModuleSlug.survey}>
    <DynamicSurveyForm {...props} />
  </RenderIfModuleActive>
)
