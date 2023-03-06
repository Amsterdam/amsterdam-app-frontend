import {useState} from 'react'
import {Address} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {
  ProjectsList,
  ProjectsListHeader,
  SearchFieldNavigator,
} from '@/modules/construction-work/components/projects'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/service'

type Props = {
  address: Address
}

export const ProjectsByDistance = ({
  address: {
    centroid: [lon = 0, lat = 0],
    adres: addressText,
  },
}: Props) => {
  const [page, setPage] = useState(1)
  const result = useGetProjectsQuery({
    address: lat && lon ? '' : addressText,
    articles_max_age: recentArticleMaxAge,
    fields: [
      'followed',
      'identifier',
      'images',
      'recent_articles',
      'subtitle',
      'title',
    ],
    lat,
    lon,
    page,
  })

  return (
    <ProjectsList
      {...result}
      getProjectTraits={({followed, meter, recent_articles, strides}) => ({
        followed,
        meter,
        recent_articles,
        strides,
      })}
      listHeader={
        <ProjectsListHeader>
          <SearchFieldNavigator />
          <StreetAddressWithEditButton
            accessibilityLabel={`Werkzaamheden dichtbij ${addressText}`}
            address={`Dichtbij ${addressText}`}
            testIDButton="ConstructionWorkButtonEditAddress"
            testIDLabel="ConstructionWorkTextAddress"
          />
        </ProjectsListHeader>
      }
      noResultsMessage="We hebben geen werkzaamheden gevonden dichtbij dit adres."
      onEndReached={() => setPage(page + 1)}
    />
  )
}
