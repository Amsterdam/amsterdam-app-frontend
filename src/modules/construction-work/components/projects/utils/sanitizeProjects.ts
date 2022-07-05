import {ProjectsItem} from '@/types'

/**
 * Filter zombie projects without identifiers and return the first 20 of them.
 * @todo Remove this workaround after updating the backend
 */
export const sanitizeProjects = (projects: ProjectsItem[]) =>
  projects
    .sort((p, q) => Number(q.followed ?? 0) - Number(p.followed ?? 0))
    .slice(0, 20)
