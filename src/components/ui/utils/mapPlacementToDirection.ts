import {Direction, Placement} from '@/components/ui/types'

export const mapPlacementToDirection = (placement: Placement): Direction => {
  const mapping: Record<Placement, Direction> = {
    [Placement.above]: Direction.down,
    [Placement.below]: Direction.up,
    [Placement.before]: Direction.right,
    [Placement.after]: Direction.left,
  }

  return mapping[placement]
}
