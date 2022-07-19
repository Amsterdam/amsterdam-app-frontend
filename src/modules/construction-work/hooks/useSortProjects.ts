import {useSelector} from 'react-redux'
import {selectConstructionWorkReadArticles} from '../construction-work.slice'
import {sortProjects as sortProjectsUtil} from '@/modules/construction-work/components/projects'
import {ProjectsItem} from '@/modules/construction-work/types'

export const useSortProjects = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const sortProjects = (projects: ProjectsItem[]) =>
    sortProjectsUtil(
      projects,
      readArticles.map(r => r.id),
    )
  return {sortProjects}
}
