import {useFormContext} from 'react-hook-form'
import type {ReactNode} from 'react'
import {
  Question,
  ConditionType,
  ConditionEquation,
} from '@/modules/survey/types'

type Props = {
  children: ReactNode
  conditions: Question['conditions']
  conditionsType?: Question['conditions_type']
}

export const SurveyConditionalFormField = ({
  children,
  conditions,
  conditionsType = ConditionType.and,
}: Props) => {
  const {watch} = useFormContext()

  if (
    conditions.length &&
    !conditions[conditionsType === ConditionType.and ? 'every' : 'some'](
      ({reference_question, type, value}) => {
        const fieldValue = watch(reference_question.toString()) as unknown

        if (type === ConditionEquation.equal) {
          return fieldValue === value
        }

        if (type === ConditionEquation.not_equal) {
          return fieldValue !== value
        }

        return false
      },
    )
  ) {
    return null
  }

  return children
}
