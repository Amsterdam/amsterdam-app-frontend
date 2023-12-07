import {Project} from '@/modules/construction-work/types/api'

/**
 * Temporarily add `progress` to timeline items. This can be removed when IPROX and our API return this property again.
 * @TODO: re-add progress to timeline item (100764)
 */
export const tempPostProcessProjectDetails = (item: Project): Project => {
  if (!item.timeline) {
    return item
  }

  return {
    ...item,
    timeline: {
      ...item.timeline,
      items:
        item.timeline.items?.map(subItem => ({
          ...subItem,
          progress: 'Huidig',
        })) ?? null,
    },
  }
}
