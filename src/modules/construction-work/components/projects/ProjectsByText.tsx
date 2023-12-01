import {skipToken} from '@reduxjs/toolkit/dist/query'
import simplur from 'simplur'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {useSelector} from '@/hooks/redux/useSelector'
import {ProjectsList} from '@/modules/construction-work/components/projects/ProjectsList'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {ProjectsTextSearchField} from '@/modules/construction-work/components/projects/ProjectsTextSearchField'
import {useProjectsSearchQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkSearchText} from '@/modules/construction-work/slice'

export const ProjectsByText = () => {
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasSearchText = !!searchText

  const {data, isError, isLoading} = useProjectsSearchQuery(
    hasSearchText
      ? {
          fields: ['id', 'image', 'subtitle', 'title'],
          text: searchText.trim(),
          query_fields: ['title', 'subtitle'],
        }
      : skipToken,
  )

  const resultsLabel =
    data && simplur`${data?.result.length} zoekresulta[at|ten]`

  useAccessibilityAnnounceEffect(resultsLabel)

  return (
    <ProjectsList
      data={data?.result}
      isError={isError}
      isLoading={isLoading}
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
