import {
  abbreviationsPronounce,
  wordCleanup,
} from '@/utils/accessibility/abbreviationsPronounce'

describe('wordCleanup', () => {
  test('complex word', () => {
    expect(wordCleanup('(GFE/t)')).toBe('gfe/t')
  })
})

describe('replaceAbbreviations', () => {
  test('vervang ‘t/m’', () => {
    expect(abbreviationsPronounce('Brouwersgracht 29 t/m 59')).toBe(
      'Brouwersgracht 29 tot en met 59',
    )
  })

  test('vervang meerdere voorkomens van ‘t/m’', () => {
    expect(
      abbreviationsPronounce('Van 1 t/m 31 januari of 1 t/m 28 februari'),
    ).toBe('Van 1 tot en met 31 januari of 1 tot en met 28 februari')
  })

  test('tekst zonder afkortingen', () => {
    expect(abbreviationsPronounce('abc123 def456 ghi789')).toBe(
      'abc123 def456 ghi789',
    )
  })
})
