import {Project} from '@/modules/construction-work/types/api'

/**
 * Temporarily add `progress` to timeline items. This can be removed when IPROX and our API return this property again.
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
          //@ts-expect-error tijdelijke oplossing
          progress: 'active',
          ...subItem,
        })) ?? null,
    },
  }
}
