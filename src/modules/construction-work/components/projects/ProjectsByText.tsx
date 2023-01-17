import {skipToken} from '@reduxjs/toolkit/dist/query'
import React from 'react'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {Paragraph} from '@/components/ui/text'
import {
  ProjectsList,
  ProjectsListHeader,
  ProjectsTextSearchField,
} from '@/modules/construction-work/components/projects'
import {useGetProjectsByTextQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkSearchText} from '@/modules/construction-work/slice'

export const ProjectsByText = () => {
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasSearchText = !!searchText

  const result = useGetProjectsByTextQuery(
    hasSearchText
      ? {
          fields: ['identifier', 'images', 'subtitle', 'title'],
          text: searchText,
          queryFields: ['title', 'subtitle'],
        }
      : skipToken,
  )

  return (
    <ProjectsList
      {...result}
      searchText={searchText}
      listHeader={
        <ProjectsListHeader>
          <ProjectsTextSearchField />
          <Paragraph>{simplur`${
            result.data?.length ?? 0
          } zoekresulta[at|ten]`}</Paragraph>
        </ProjectsListHeader>
      }
      noResultsMessage="We hebben geen werkzaamheden gevonden voor deze zoekterm."
    />
  )
}
