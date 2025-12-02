import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {SurveyFormField} from '@/modules/survey/components/SurveyFormField'
import {useDynamicForm} from '@/modules/survey/hooks/useDynamicForm'

type Props = {
  entryPoint: string
}

export const DynamicForm = ({entryPoint}: Props) => {
  const form = useForm()
  const {handleSubmit} = form
  const {onSubmit, survey, isError, isFetching} = useDynamicForm(entryPoint)

  const formFields = useMemo(
    () =>
      survey?.questions.map(question => (
        <SurveyFormField
          key={question.id}
          question={question}
        />
      )),
    [survey?.questions],
  )

  if (isFetching) {
    return <PleaseWait testID="DynamicFormPleaseWait" />
  }

  if (isError || !survey) {
    return <SomethingWentWrong testID="DynamicFormSomethingWentWrong" />
  }

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        {formFields}
        <Button
          label="Verzenden"
          onPress={handleSubmit(onSubmit)}
          testID="DynamicFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
