import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Edit} from '@/assets/icons'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressRouteName} from '@/modules/address/routes'
import {ProjectsBy} from '@/modules/construction-work/components/projects'
import {articlesMaxAgeInDays} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {useSortProjects} from '@/modules/construction-work/hooks/useSortProjects'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ModuleSlugs} from '@/modules/slugs'
import {useTheme} from '@/themes'
import {Address} from '@/types'

type ListHeaderProps = {
  addressText: string
}

const ListHeader = ({addressText}: ListHeaderProps) => {
  const {color} = useTheme()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
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
              <Edit fill={color.pressable.default.background} />
            </Icon>
          }
          onPress={
            // TODO Open as modal
            () =>
              navigation.navigate(ModuleSlugs.address, {
                screen: AddressRouteName.addressForm,
              })
          }
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
    articles_max_age: articlesMaxAgeInDays,
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
    <ProjectsBy
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
