import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {FormFields} from '@/modules/survey/components/FormFields'
import {useConfigConditionsPassed} from '@/modules/survey/hooks/useConfigConditionsPassed'
import {useOnFormSubmit} from '@/modules/survey/hooks/useOnFormSubmit'

type Props = {
  entryPoint: string
}

export const DynamicForm = ({entryPoint}: Props) => {
  const form = useForm()
  const {handleSubmit} = form
  const {
    isConditionsPassed: showSurvey,
    survey,
    surveyId,
  } = useConfigConditionsPassed(entryPoint)
  const {onSubmit, createSurveyIsLoading} = useOnFormSubmit({
    survey,
    entryPoint,
    surveyId,
  })

  if (!showSurvey) {
    return null
  }

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="xl">
          <FormFields questions={survey?.latest_version.questions} />
          <Button
            isLoading={createSurveyIsLoading}
            label="Verzenden"
            onPress={handleSubmit(onSubmit)}
            testID="DynamicFormSubmitButton"
          />
        </Column>
      </Box>
    </FormProvider>
  )
}
