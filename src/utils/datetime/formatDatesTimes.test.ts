import {formatDatesTimes} from '@/utils/datetime/formatDatesTimes'

test('no valid day names', () =>
  expect(
    formatDatesTimes(
      'Geen ophaaldagen te vinden',
      '06.00',
      null,
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('op de afgesproken dag'))

test('missing ‘from’ value', () =>
  expect(
    formatDatesTimes(
      'maandag en dinsdag',
      'ongeldige tijd',
      null,
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('aanbiedtijden onbekend'))

test('two days and a ‘from’ time', () =>
  expect(
    formatDatesTimes(
      'maandag en donderdag',
      '06.00',
      null,
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('maandag vanaf 06.00 uur en donderdag vanaf 06.00 uur'))

test('one day, both times,', () =>
  expect(
    formatDatesTimes(
      'maandag',
      '20.00',
      '07.30',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('zondag vanaf 20.00 uur tot maandag 07.30 uur'))

test('a capitalised day, both times,', () =>
  expect(
    formatDatesTimes(
      'Maandag',
      '20.00',
      '07.30',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('zondag vanaf 20.00 uur tot maandag 07.30 uur'))

test('one day, both times, with single days', () =>
  expect(
    formatDatesTimes(
      'vrijdag',
      'donderdag 21.00',
      'vrijdag 07.30',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('donderdag vanaf 21.00 uur tot vrijdag 07.30 uur'))

test('two days, both times, overnight', () =>
  expect(
    formatDatesTimes(
      'maandag en vrijdag',
      'zondag en donderdag 21.00',
      'maandag en vrijdag 07.00',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe(
    'zondag vanaf 21.00 uur tot maandag 07.00 uur en donderdag vanaf 21.00 uur tot vrijdag 07.00 uur',
  ))

test('two days, both times, in the morning', () =>
  expect(
    formatDatesTimes(
      'maandag en donderdag',
      'maandag en donderdag vanaf 06.00',
      'maandag en donderdag 07.30',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe(
    'maandag vanaf 06.00 tot 07.30 uur en donderdag vanaf 06.00 tot 07.30 uur',
  ))

test('two days, both times, in the evening', () =>
  expect(
    formatDatesTimes(
      'maandag en donderdag',
      'maandag en donderdag vanaf 17.00',
      'maandag en donderdag 18.00',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe(
    'maandag vanaf 17.00 tot 18.00 uur en donderdag vanaf 17.00 tot 18.00 uur',
  ))

test('date range', () =>
  expect(
    formatDatesTimes(
      'Maandag tot en met zaterdag',
      'Maandag tot en met zaterdag vanaf 17.30',
      'Maandag tot en met zaterdag 20.00',
      'aanbiedtijden onbekend',
      'op de afgesproken dag',
    ),
  ).toBe('Maandag tot en met zaterdag tussen 17.30 en 20.00 uur'))
