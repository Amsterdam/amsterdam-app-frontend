import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Edit} from '@/assets/icons'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {ProjectsList} from '@/modules/construction-work/components/projects'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {useSortProjects} from '@/modules/construction-work/hooks'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useGetProjectsQuery} from '@/modules/construction-work/service'
import {Theme, useThemable} from '@/themes'
import {Address} from '@/types'

type ListHeaderProps = {
  addressText: string
}

const ListHeader = ({addressText}: ListHeaderProps) => {
  const iconProps = useThemable(createIconProps)

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName.projects>
    >()

  return (
    <Box>
      <Row gutter="sm" valign="center">
        <Paragraph accessibilityLabel={`Werkzaamheden dichtbij ${addressText}`}>
          Dichtbij {addressText}
        </Paragraph>
        <IconButton
          accessibilityLabel="Wijzig het adres"
          icon={
            <Icon size={24}>
              <Edit {...iconProps} />
            </Icon>
          }
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
        />
      </Row>
    </Box>
  )
}

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
      listHeader={<ListHeader addressText={addressText} />}
      noResultsMessage="We hebben geen werkzaamheden gevonden dichtbij dit adres."
    />
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
