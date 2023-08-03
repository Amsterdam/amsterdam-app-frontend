import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useSelector} from 'react-redux'
import simplur from 'simplur'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ProjectsList} from '@/modules/construction-work/components/projects/ProjectsList'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {ProjectsTextSearchField} from '@/modules/construction-work/components/projects/ProjectsTextSearchField'
import {useGetProjectsByTextQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkSearchText} from '@/modules/construction-work/slice'

export const ProjectsByText = () => {
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasSearchText = !!searchText

  const result = useGetProjectsByTextQuery(
    hasSearchText
      ? {
          fields: ['identifier', 'images', 'subtitle', 'title'],
          text: searchText.trim(),
          queryFields: ['title', 'subtitle'],
        }
      : skipToken,
  )

  const resultsLabel =
    result.data && simplur`${result.data?.length} zoekresulta[at|ten]`

  return (
    <ProjectsList
      {...result}
      listHeader={
        <ProjectsListHeader>
          <ProjectsTextSearchField />
          {!!resultsLabel && (
            <Paragraph testID="ConstructionWorkProjectsNumberOfSearchResultsText">
              {resultsLabel}
            </Paragraph>
          )}
        </ProjectsListHeader>
      }
      noResultsMessage="We hebben geen werkzaamheden gevonden voor deze zoekterm."
      searchText={searchText}
    />
  )
}
