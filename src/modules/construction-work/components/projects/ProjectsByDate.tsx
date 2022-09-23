import React from 'react'
import {ProjectsList} from '@/modules/construction-work/components/projects'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useSortProjects} from '@/modules/construction-work/hooks'
import {useGetProjectsQuery} from '@/modules/construction-work/service'

export const ProjectsByDate = () => {
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
    sortBy: 'publication_date',
    sortOrder: 'desc',
  })

  const sortedProjects = useSortProjects(result.data)

  return (
    <ProjectsList
      {...result}
      data={sortedProjects}
      getProjectTraits={({followed, recent_articles}) => ({
        followed,
        recent_articles,
      })}
    />
  )
}
