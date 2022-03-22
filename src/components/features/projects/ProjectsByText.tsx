import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/query/react'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {DeviceContext} from '../../../providers'
import {useGetProjectsByTextQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {Project} from '../../../types'
import {mapImageSources} from '../../../utils'
import {Box, PleaseWait, SomethingWentWrong, Text, Title} from '../../ui'
import {Gutter} from '../../ui/layout'
import {ProjectCard} from '../project'
import {selectProjectSearchText} from './projectsByTextSlice'

export const ProjectsByText = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const device = useContext(DeviceContext)
  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const searchText = useSelector(selectProjectSearchText)
  const params = searchText
    ? {
        fields: ['identifier', 'images', 'subtitle', 'title'],
        text: searchText,
        queryFields: ['subtitle', 'title'],
      }
    : undefined

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsByTextQuery(params ?? skipToken)

  if (!searchText) {
    return null
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  const renderListHeader = () => (
    <>
      <Box insetHorizontal="md">
        <Text intro>{projects.length} zoekresultaten</Text>
        <Gutter height="md" />
      </Box>
      {projects.length === 0 ? (
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
      data={projects}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={project => project.identifier}
      ListHeaderComponent={renderListHeader}
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
