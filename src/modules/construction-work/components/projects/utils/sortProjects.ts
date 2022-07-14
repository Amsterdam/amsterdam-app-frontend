import {ProjectsItem} from '@/modules/construction-work/types'

export const sortProjects = (projects: ProjectsItem[]) =>
  [...projects].sort((p, q) => Number(q.followed) - Number(p.followed))
