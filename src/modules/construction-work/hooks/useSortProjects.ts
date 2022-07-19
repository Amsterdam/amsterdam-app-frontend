import {useSelector} from 'react-redux'
import {selectConstructionWorkReadArticles} from '../construction-work.slice'
import {sortProjects} from '@/modules/construction-work/components/projects'
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
