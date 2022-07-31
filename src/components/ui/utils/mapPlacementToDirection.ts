import {Direction, Placement} from '@/components/ui/types'

export const mapPlacementToDirection = (placement: Placement): Direction => {
  const mapping: Record<Placement, Direction> = {
    [Placement.top]: Direction.down,
    [Placement.bottom]: Direction.up,
    [Placement.start]: Direction.forward,
    [Placement.end]: Direction.back,
  }

  return mapping[placement]
}
