import {useCallback, useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/survey/alerts'
import {SurveyFormField} from '@/modules/survey/components/SurveyFormField'
import {useDynamicForm} from '@/modules/survey/hooks/useDynamicForm'
import {useCreateSurveyVersionEntryMutation} from '@/modules/survey/service'
import {getAnswers} from '@/modules/survey/utils/getAnswers'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'

type Props = {
  entryPoint: string
}

export const DynamicForm = ({entryPoint}: Props) => {
  const navigation = useNavigation()
  const form = useForm()
  const {handleSubmit} = form
  const {data, isError, isFetching} = useDynamicForm(entryPoint)
  const [createSurvey, {isLoading: createSurveyIsLoading}] =
    useCreateSurveyVersionEntryMutation()
  const {setAlert} = useAlert()
  const trackException = useTrackException()
  const survey = data?.survey

  const onSubmit = useCallback(
    (formData: Record<string, string | string[]>) => {
      if (!survey) {
        return
      }

      const answers = getAnswers(formData)

      void createSurvey({
        answers,
        entry_point: entryPoint,
        unique_code: survey?.unique_code,
        version: survey?.latest_version.version,
      })
        .unwrap()
        .then(
          () => {
            setAlert(alerts.feedbackSuccess)
            navigation.popToTop()
          },
          error => {
            setAlert(alerts.feedbackFailed)
            trackException(
              ExceptionLogKey.surveySubmissionFailed,
              'DynamicForm.tsx',
              {error, surveyId: data?.id},
            )
            navigation.popToTop()
          },
        )
    },
    [
      createSurvey,
      data?.id,
      entryPoint,
      navigation,
      setAlert,
      survey,
      trackException,
    ],
  )

  const formFields = useMemo(
    () =>
      survey?.latest_version?.questions.map(question => (
        <SurveyFormField
          key={question.id}
          question={question}
        />
      )),
    [survey?.latest_version?.questions],
  )

  if (isFetching) {
    return <PleaseWait testID="DynamicFormPleaseWait" />
  }

  if (isError || !survey?.latest_version) {
    return <SomethingWentWrong testID="DynamicFormSomethingWentWrong" />
  }

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        {formFields}
        <Button
          isLoading={createSurveyIsLoading}
          label="Verzenden"
          onPress={handleSubmit(onSubmit)}
          testID="DynamicFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
