import React from 'react'
import {Box} from '@/components/ui/containers'
import {Address} from '@/modules/address'
import {StreetAddressWithEditButton} from '@/modules/address/components'
import {ProjectsList} from '@/modules/construction-work/components/projects'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useSortProjects} from '@/modules/construction-work/hooks'
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
    sortBy: 'meter',
  })

  const sortedProjects = useSortProjects(result.data)

  return (
    <ProjectsList
      {...result}
      data={sortedProjects}
      getProjectTraits={({followed, meter, recent_articles, strides}) => ({
        followed,
        meter,
        recent_articles,
        strides,
      })}
      listHeader={
        <Box>
          <StreetAddressWithEditButton
            accessibilityLabel={`Werkzaamheden dichtbij ${addressText}`}
            address={`Dichtbij ${addressText}`}
          />
        </Box>
      }
      noResultsMessage="We hebben geen werkzaamheden gevonden dichtbij dit adres."
    />
  )
}
