import Pointer from '@amsterdam/asc-assets/static/icons/Pointer.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {DeviceContext} from '../../../providers'
import {useGetProjectsSearchQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {color, size} from '../../../tokens'
import {Project} from '../../../types'
import {mapImageSources} from '../../../utils'
import {Attention, Box, PleaseWait, Text, Title, Trait} from '../../ui'
import {ProjectCard} from '../project'

type Props = {
  text: string
}

export const ProjectsSearchResults = ({text}: Props) => {
  const device = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsSearchQuery({
    fields: ['title', 'subtitle', 'images', 'identifier'],
    text,
    query_fields: 'title,subtitle',
  })

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return (
      <Box>
        <Attention warning>
          <Text intro>Sorry…</Text>
          <Text>Er ging iets mis.</Text>
        </Attention>
      </Box>
    )
  }

  const listHeaderComponent = () => (
    <>
      <Box background="grey">
        <Text intro>{projects?.length ?? 0} zoekresultaten</Text>
      </Box>
      {!projects?.length ? (
        <Box insetHorizontal="md">
          <Title level={3} text="Helaas…" />
          <Text>We hebben geen resultaten gevonden voor deze zoekterm.</Text>
        </Box>
      ) : null}
    </>
  )

  const renderItem = ({item: project}: {item: Project}) => (
    <ProjectCard
      imageSource={
        project.images?.[0] && mapImageSources(project.images[0].sources)
      }
      kicker={
        <Trait
          icon={<Pointer fill={color.touchable.primary} />}
          label={`Score: ${project.score}`}
        />
      }
      onPress={() =>
        navigation.navigate(routes.projectDetail.name, {
          id: project.identifier,
        })
      }
      style={layoutStyles.grow}
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )

  return (
    <FlatGrid
      data={projects ?? []}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={project => project.identifier}
      ListHeaderComponent={listHeaderComponent}
      renderItem={renderItem}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
