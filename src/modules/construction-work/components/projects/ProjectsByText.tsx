import {skipToken} from '@reduxjs/toolkit/query'
import simplur from 'simplur'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {useSelector} from '@/hooks/redux/useSelector'
import {ProjectsList} from '@/modules/construction-work/components/projects/ProjectsList'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {ProjectsTextSearchField} from '@/modules/construction-work/components/projects/ProjectsTextSearchField'
import {useProjectsSearchQuery} from '@/modules/construction-work/service'
import {selectConstructionWorkSearchText} from '@/modules/construction-work/slice'
import {SearchFieldProvider} from '@/providers/searchField.provider'

export const ProjectsByText = () => {
  const searchText = useSelector(selectConstructionWorkSearchText)

  const hasSearchText = !!searchText

  const {data, isError, isLoading} = useProjectsSearchQuery(
    hasSearchText
      ? {
          fields: ['id', 'image', 'subtitle', 'title'],
          text: searchText,
          query_fields: ['title', 'subtitle'],
        }
      : skipToken,
  )

  const resultsLabel =
    hasSearchText && data?.result
      ? simplur`${data.result.length} zoekresulta[at|ten]`
      : undefined
  const results = hasSearchText ? data?.result : undefined

  useAccessibilityAnnounceEffect(resultsLabel)

  return (
    <SearchFieldProvider
      amount={data?.result.length}
      type="projectsByText">
      <ProjectsList
        data={results}
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
    </SearchFieldProvider>
  )
}
