import {replaceAbbreviations} from './replaceAbbreviations'

test('vervang ‘t/m’', () =>
  expect(replaceAbbreviations('Brouwersgracht 29 t/m 59')).toBe(
    'Brouwersgracht 29 tot en met 59',
  ))

test('vervang meerdere voorkomens van ‘t/m’', () =>
  expect(
    replaceAbbreviations('Van 1 t/m 31 januari of 1 t/m 28 februari'),
  ).toBe('Van 1 tot en met 31 januari of 1 tot en met 28 februari'))

test('tekst zonder afkortingen', () =>
  expect(replaceAbbreviations('abc123 def456 ghi789')).toBe(
    'abc123 def456 ghi789',
  ))
