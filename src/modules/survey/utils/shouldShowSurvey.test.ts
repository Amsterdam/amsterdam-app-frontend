import type {SurveyConfig, SurveyConfigParam} from '@/modules/survey/types'
import {shouldShowSurvey} from '@/modules/survey/utils/shouldShowSurvey'
import {dayjs} from '@/utils/datetime/dayjs'

describe('shouldShowSurvey', () => {
  const baseParams: SurveyConfigParam = {
    surveyId: 1,
    lastSeenAt: dayjs().subtract(1, 'day'),
    actionCount: 5,
  }
  const baseConfig: Omit<SurveyConfig, 'location'> = {
    cooldown: 1,
    minimum_actions: 5,
    fraction: 1,
  }

  it('returns true when all conditions are met', () => {
    expect(shouldShowSurvey(baseParams, baseConfig)).toBe(true)
  })

  it('returns false when cooldown is not over', () => {
    const params = {...baseParams, lastSeenAt: dayjs()}

    expect(shouldShowSurvey(params, baseConfig)).toBe(false)
  })

  it('returns false when minimum actions not met', () => {
    const params = {...baseParams, actionCount: 2}

    expect(shouldShowSurvey(params, baseConfig)).toBe(false)
  })

  it('returns false when fraction is 0', () => {
    const config = {...baseConfig, fraction: 0}

    expect(shouldShowSurvey(baseParams, config)).toBe(false)
  })

  it('returns true when cooldown is 0', () => {
    const config = {...baseConfig, cooldown: 0}

    expect(shouldShowSurvey(baseParams, config)).toBe(true)
  })
})
