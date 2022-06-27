import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '_app/navigation'
import {Paragraph, Title} from '_components/ui/text'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {selectAddress} from '@/modules/address/addressSlice'
import {
  sanitizeProjects,
  selectIsProjectsSearching,
} from '@/modules/construction-work/components/projects'
import {ProjectCard} from '@/modules/construction-work/components/shared'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

type ListItemProps = {
  navigation: StackNavigationProp<
    RootStackParamList & ProjectsStackParams,
    ConstructionWorkRouteName.projects
  >
  project: ProjectsItem
}

const ListItem = ({navigation, project}: ListItemProps) => {
  const environment = useEnvironment()

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      onPress={() =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.identifier,
        })
      }
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )
}

const ListEmpty = () => (
  <Box insetHorizontal="md">
    <Title level="h1" text="Helaas…" />
    <Paragraph>We hebben geen projecten gevonden.</Paragraph>
  </Box>
)

export const ProjectsByDate = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        ProjectsStackParams,
        ConstructionWorkRouteName.projects
      >
    >()

  const {primary: address} = useSelector(selectAddress)
  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const isSearching = useSelector(selectIsProjectsSearching)

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery({
    sortBy: 'publication_date',
    sortOrder: 'desc',
  })

  if (address || isSearching) {
    return null
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <FlatGrid
      data={sanitizeProjects(projects)}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={project => project.identifier}
      ListEmptyComponent={ListEmpty}
      renderItem={({item}) => (
        <ListItem navigation={navigation} project={item} />
      )}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
