import {getAnswers} from '@/modules/survey/utils/getAnswers'

describe('getAnswers', () => {
  it('returns single answer for string value', () => {
    const formData = {'10': 'A'}

    expect(getAnswers(formData)).toEqual([{question: 10, answer: 'A'}])
  })

  it('returns multiple answers for array value', () => {
    const formData = {'10': ['A', 'B']}

    expect(getAnswers(formData)).toEqual([
      {question: 10, answer: 'A'},
      {question: 10, answer: 'B'},
    ])
  })

  it('handles mixed string and array values', () => {
    const formData = {'10': ['A', 'B'], '20': 'C'}

    expect(getAnswers(formData)).toEqual([
      {question: 10, answer: 'A'},
      {question: 10, answer: 'B'},
      {question: 20, answer: 'C'},
    ])
  })

  it('returns empty array for empty input', () => {
    expect(getAnswers({})).toEqual([])
  })
})
