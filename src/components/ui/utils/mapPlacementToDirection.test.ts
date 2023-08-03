import {Direction, Placement} from '@/components/ui/types'
import {mapPlacementToDirection} from '@/components/ui/utils/mapPlacementToDirection'

test('placement is `top`', () =>
  expect(mapPlacementToDirection(Placement.above)).toBe(Direction.down))

test('placement is `bottom`', () =>
  expect(mapPlacementToDirection(Placement.below)).toBe(Direction.up))

test('placement is `start`', () =>
  expect(mapPlacementToDirection(Placement.before)).toBe(Direction.right))

test('placement is `end`', () =>
  expect(mapPlacementToDirection(Placement.after)).toBe(Direction.left))
