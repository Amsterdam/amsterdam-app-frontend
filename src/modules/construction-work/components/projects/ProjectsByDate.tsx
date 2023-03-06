import {useState} from 'react'
import {
  ProjectsList,
  ProjectsListHeader,
  ProvideAddressButton,
  SearchFieldNavigator,
} from '@/modules/construction-work/components/projects'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/service'

export const ProjectsByDate = () => {
  const [page, setPage] = useState(1)
  const result = useGetProjectsQuery({
    articles_max_age: recentArticleMaxAge,
    fields: [
      'followed',
      'identifier',
      'images',
      'publication_date',
      'recent_articles',
      'subtitle',
      'title',
    ],
    page,
  })

  return (
    <ProjectsList
      {...result}
      getProjectTraits={({followed, recent_articles}) => ({
        followed,
        recent_articles,
      })}
      listHeader={
        <ProjectsListHeader>
          <SearchFieldNavigator />
          <ProvideAddressButton />
        </ProjectsListHeader>
      }
      onEndReached={() => setPage(page + 1)}
    />
  )
}
