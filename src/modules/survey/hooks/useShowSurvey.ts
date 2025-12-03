import {useEffect, useState} from 'react'
import type {SurveyConfigByLocationResponse} from '@/modules/survey/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectSurveyParams,
  addSurveyParams,
  updateSurveyParams,
  resetActionCount,
} from '@/modules/survey/slice'
import {shouldShowSurvey} from '@/modules/survey/utils/shouldShowSurvey'

export const useShowSurvey = ({
  id,
  cooldown,
  minimum_actions,
  fraction,
}: Partial<SurveyConfigByLocationResponse>) => {
  const [showSurvey, setShowSurvey] = useState(false)
  const dispatch = useDispatch()
  const surveyParams = useSelector(selectSurveyParams(id))

  useEffect(() => {
    if (!id) {
      return
    }

    if (!surveyParams) {
      dispatch(addSurveyParams(id))
    }
  }, [dispatch, id, surveyParams])

  useEffect(() => {
    if (!surveyParams) {
      return
    }

    const shouldShow = shouldShowSurvey(surveyParams, {
      cooldown,
      minimum_actions,
      fraction,
    })

    if (shouldShow) {
      setShowSurvey(true)
      dispatch(resetActionCount(id))
    } else {
      setShowSurvey(false)
      dispatch(updateSurveyParams(id))
    }
  }, [cooldown, dispatch, fraction, id, minimum_actions, surveyParams])

  return showSurvey
}
