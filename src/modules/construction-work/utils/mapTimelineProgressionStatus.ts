import {ProjectTimelineItem} from '@/modules/construction-work/types/api'

export const mapProgressionStatus = (
  progress: ProjectTimelineItem['progress'],
) => {
  switch (progress) {
    case 'Afgelopen':
      return 'done'
    case 'Huidig':
      return 'current'
    case 'Aankomend':
      return 'upcoming'
    default:
      return undefined
  }
}
