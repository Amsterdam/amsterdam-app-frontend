import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {SurveyFormField} from '@/modules/survey/components/SurveyFormField'
import {type Question} from '@/modules/survey/types'

type Props = {
  onSubmit: (data: unknown) => void
  questions: Question[]
}

export const DynamicForm = ({questions, onSubmit}: Props) => {
  const form = useForm()
  const {handleSubmit} = form

  const FormFields = useMemo(
    () =>
      questions.map(question => (
        <SurveyFormField
          key={question.id}
          question={question}
        />
      )),
    [questions],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        {FormFields}
        <Button
          label="Verzenden"
          onPress={handleSubmit(onSubmit)}
          testID="DynamicFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
