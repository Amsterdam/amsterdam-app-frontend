import {Direction, Placement} from '@/components/ui/types'

export const mapPlacementToDirection = (placement: Placement): Direction => {
  const mapping: Record<Placement, Direction> = {
    top: 'down',
    bottom: 'up',
    start: 'forward',
    end: 'back',
  }

  return mapping[placement]
}
