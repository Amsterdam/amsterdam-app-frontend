import {useCallback} from 'react'
import type {Survey} from '@/modules/survey/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/survey/alerts'
import {useCreateSurveyVersionEntryMutation} from '@/modules/survey/service'
import {getAnswers} from '@/modules/survey/utils/getAnswers'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'

type Params = {
  entryPoint: string
  survey?: Survey
  surveyId?: number
}

export const useOnFormSubmit = ({survey, entryPoint, surveyId}: Params) => {
  const navigation = useNavigation()
  const [createSurvey, {isLoading}] = useCreateSurveyVersionEntryMutation()
  const {setAlert} = useAlert()
  const trackException = useTrackException()

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
              {error, surveyId},
            )
            navigation.popToTop()
          },
        )
    },
    [
      createSurvey,
      entryPoint,
      navigation,
      setAlert,
      survey,
      surveyId,
      trackException,
    ],
  )

  return {onSubmit, createSurveyIsLoading: isLoading}
}
