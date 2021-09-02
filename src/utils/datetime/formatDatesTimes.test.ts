import {formatDatesTimes} from '../'

test('no valid day names', () =>
  expect(
    formatDatesTimes(
      'Geen ophaaldagen te vinden',
      '06.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
    ),
  ).toBe('ophaaldagen onbekend'))

test('missing ‘from’ value', () =>
  expect(
    formatDatesTimes(
      'maandag en dinsdag',
      'ongeldige tijd',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
    ),
  ).toBe('aanbiedtijden onbekend'))

test('two days and a ‘from’ time', () =>
  expect(
    formatDatesTimes(
      'maandag en donderdag',
      '06.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
    ),
  ).toBe('maandag vanaf 06.00 uur en donderdag vanaf 06.00 uur'))

test('one day, both times,', () =>
  expect(
    formatDatesTimes(
      'maandag',
      '20.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      '07.30',
    ),
  ).toBe('vanaf zondag 20.00 uur tot maandag 07.30 uur'))

test('a capitalised day, both times,', () =>
  expect(
    formatDatesTimes(
      'Maandag',
      '20.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      '07.30',
    ),
  ).toBe('vanaf zondag 20.00 uur tot maandag 07.30 uur'))

test('one day, both times, with single days', () =>
  expect(
    formatDatesTimes(
      'vrijdag',
      'donderdag 21.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      'vrijdag 07.30',
    ),
  ).toBe('vanaf donderdag 21.00 uur tot vrijdag 07.30 uur'))

test('two days, both times, overnight', () =>
  expect(
    formatDatesTimes(
      'maandag en vrijdag',
      'zondag en donderdag 21.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      'maandag en vrijdag 07.00',
    ),
  ).toBe(
    'vanaf zondag 21.00 uur tot maandag 07.00 uur en vanaf donderdag 21.00 uur tot vrijdag 07.00 uur',
  ))

test('two days, both times, in the morning', () =>
  expect(
    formatDatesTimes(
      'maandag en donderdag',
      'maandag en donderdag vanaf 06.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      'maandag en donderdag 07.30',
    ),
  ).toBe(
    'maandag vanaf 06.00 tot 07.30 uur en donderdag vanaf 06.00 tot 07.30 uur',
  ))

test('two days, both times, in the evening', () =>
  expect(
    formatDatesTimes(
      'maandag en donderdag',
      'maandag en donderdag vanaf 17.00',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      'maandag en donderdag 18.00',
    ),
  ).toBe(
    'maandag vanaf 17.00 tot 18.00 uur en donderdag vanaf 17.00 tot 18.00 uur',
  ))

test('date range', () =>
  expect(
    formatDatesTimes(
      'Maandag tot en met zaterdag',
      'Maandag tot en met zaterdag vanaf 17.30',
      'aanbiedtijden onbekend',
      'ophaaldagen onbekend',
      'Maandag tot en met zaterdag 20.00',
    ),
  ).toBe('op de ophaaldagen tussen 17.30 en 20.00 uur'))
