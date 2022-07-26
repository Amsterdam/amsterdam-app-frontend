import {useSelector} from 'react-redux'
import {sortProjects} from '@/modules/construction-work/components/projects'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/construction-work.slice'
import {ProjectsItem} from '@/modules/construction-work/types'

export const useSortProjects = (projects?: ProjectsItem[]) => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  if (!projects) {
    return []
  }

  return sortProjects(
    projects,
    readArticles.map(r => r.id),
  )
}
