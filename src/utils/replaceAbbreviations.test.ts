import {replaceAbbreviations} from './'

test('vervang ‘t/m’', () =>
  expect(replaceAbbreviations('Brouwersgracht 29 t/m 59')).toBe(
    'Brouwersgracht 29 tot en met 59',
  ))

test('tekst zonder afkortingen', () =>
  expect(replaceAbbreviations('abc123 def456 ghi789')).toBe(
    'abc123 def456 ghi789',
  ))
