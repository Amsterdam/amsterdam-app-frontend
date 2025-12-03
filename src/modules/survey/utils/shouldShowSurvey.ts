import type {SurveyConfig, SurveyConfigParam} from '@/modules/survey/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const shouldShowSurvey = (
  surveyParams: SurveyConfigParam,
  {
    cooldown,
    minimum_actions,
    fraction,
  }: Partial<Omit<SurveyConfig, 'location'>>,
) => {
  if (
    cooldown === undefined ||
    minimum_actions === undefined ||
    fraction === undefined
  ) {
    return false
  }

  const isCooldownOver =
    dayjs().diff(surveyParams.lastSeenAt, 'days') >= cooldown
  const isMinimumActionsMet = surveyParams.actionCount >= minimum_actions
  const isRandomlySelected = Math.random() <= fraction

  return isCooldownOver && isMinimumActionsMet && isRandomlySelected
}
