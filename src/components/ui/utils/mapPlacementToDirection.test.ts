import {mapPlacementToDirection} from './mapPlacementToDirection'

test('placement is `top`', () =>
  expect(mapPlacementToDirection('top')).toBe('down'))

test('placement is `bottom`', () =>
  expect(mapPlacementToDirection('bottom')).toBe('up'))

test('placement is `start`', () =>
  expect(mapPlacementToDirection('start')).toBe('forward'))

test('placement is `end`', () =>
  expect(mapPlacementToDirection('end')).toBe('back'))
