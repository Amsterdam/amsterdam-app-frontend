import {Placement} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'

test('placement is `top`', () =>
  expect(mapPlacementToDirection(Placement.top)).toBe('down'))

test('placement is `bottom`', () =>
  expect(mapPlacementToDirection(Placement.bottom)).toBe('up'))

test('placement is `start`', () =>
  expect(mapPlacementToDirection(Placement.start)).toBe('forward'))

test('placement is `end`', () =>
  expect(mapPlacementToDirection(Placement.end)).toBe('back'))
