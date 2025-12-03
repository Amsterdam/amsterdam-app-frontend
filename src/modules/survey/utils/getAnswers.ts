import type {Answer} from '@/modules/survey/types'

export const getAnswers = (formData: Record<string, string | string[]>) =>
  Object.keys(formData)
    .flatMap(question => {
      const value = formData[question]

      if (!value) {
        return
      }

      if (Array.isArray(value)) {
        return value.map(answer => ({
          question: Number(question),
          answer,
        }))
      }

      return {
        question: Number(question),
        answer: value,
      }
    })
    .filter(Boolean) as Answer[]
