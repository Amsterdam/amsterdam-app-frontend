import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/query/react'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import simplur from 'simplur'
import {RootStackParams} from '@/app/navigation'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Gutter} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {sanitizeProjects} from '@/modules/construction-work/components/projects'
import {ProjectCard} from '@/modules/construction-work/components/shared'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useGetProjectsByTextQuery} from '@/modules/construction-work/services'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

type ListHeaderProps = {
  results: number
}

const ListHeader = ({results}: ListHeaderProps) => (
  <Box insetHorizontal="md">
    <Paragraph>{simplur`${results} zoekresulta[at|ten]`}</Paragraph>
    <Gutter height="lg" />
  </Box>
)

type ListItemProps = {
  navigation: StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
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

const ListEmptyMessage = () => (
  <Box insetHorizontal="md">
    <EmptyMessage text="We hebben geen werkzaamheden gevonden voor deze zoekterm." />
  </Box>
)

type Props = {
  searchText: string
}

export const ProjectsByText = ({searchText}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
    >()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const params = {
    fields: ['identifier', 'images', 'subtitle', 'title'],
    text: searchText,
    queryFields: ['subtitle', 'title'],
  }

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsByTextQuery(params ?? skipToken)

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
      ListEmptyComponent={ListEmptyMessage}
      ListHeaderComponent={<ListHeader results={projects.length} />}
      renderItem={({item}) => (
        <ListItem navigation={navigation} project={item} />
      )}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
