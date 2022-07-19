import React from 'react'
import {ProjectsBy} from '@/modules/construction-work/components/projects'
import {articlesMaxAgeInDays} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {useSortProjects} from '@/modules/construction-work/hooks/useSortProjects'

export const ProjectsByDate = () => {
  const result = useGetProjectsQuery({
    articles_max_age: articlesMaxAgeInDays,
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
    <ProjectsBy
      {...result}
      data={sortedProjects}
      getProjectTraits={({followed, recent_articles}) => ({
        followed,
        recent_articles,
      })}
    />
  )
}
