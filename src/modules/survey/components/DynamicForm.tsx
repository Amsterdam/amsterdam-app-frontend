import {ReactNode, useMemo} from 'react'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {
  ConditionEquation,
  ConditionType,
  type Question,
} from '@/modules/survey/types'
import {questionTypeToComponentMap} from '@/modules/survey/utils/questionTypeToComponentMap'

type ConditionalComponentProps = {
  children: ReactNode
  conditions: Question['conditions']
  conditionsType?: Question['conditions_type']
}

const ConditionalComponent = ({
  children,
  conditions,
  conditionsType = ConditionType.and,
}: ConditionalComponentProps) => {
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

type Props = {
  onSubmit: (data: unknown) => void
  questions: Question[]
}

export const DynamicForm = ({questions, onSubmit}: Props) => {
  const form = useForm()
  const {handleSubmit} = form

  const components = useMemo(
    () =>
      questions.map(question => {
        const Component = questionTypeToComponentMap[question.question_type]

        if (!Component) {
          return null
        }

        return (
          <ConditionalComponent
            conditions={question.conditions}
            conditionsType={question.conditions_type}
            key={question.id}>
            <Component
              label={question.question_text}
              name={question.id.toString()}
              options={question.choices}
              placeholder={question.default}
              rules={{
                required: question.required
                  ? 'Dit veld is verplicht'
                  : undefined,
              }}
              testID={question.question_type}
              {...question}
            />
          </ConditionalComponent>
        )
      }),
    [questions],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        {components}
        <Button
          label="Verzenden"
          onPress={handleSubmit(onSubmit)}
          testID="DynamicFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
