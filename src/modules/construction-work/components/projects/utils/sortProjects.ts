import dayjs from 'dayjs'
import {ProjectsItem} from '@/modules/construction-work/types'

export const sortProjects = (projects: ProjectsItem[]) =>
  [...projects].sort(
    (p, q) =>
      (Number(q.followed) - Number(p.followed)) * 10 +
      (dayjs(p.recent_articles?.[0]?.publication_date).isAfter(
        dayjs(q.recent_articles?.[0]?.publication_date),
      )
        ? -1
        : 1),
  )
