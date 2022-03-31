import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {useAsyncStorage} from '../../../hooks'
import {DeviceContext} from '../../../providers'
import {useGetProjectsQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {Address, Project} from '../../../types'
import {mapImageSources} from '../../../utils'
import {PleaseWait, SomethingWentWrong} from '../../ui'
import {ProjectCard} from '../project'
import {selectIsProjectsSearching} from './'

export const ProjectsByDate = () => {
  const device = useContext(DeviceContext)
  const isSearching = useSelector(selectIsProjectsSearching)
  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()
  const {getValue, isLoading: isAddressLoading} = useAsyncStorage()
  const [address, setAddress] = useState<Address | undefined>()

  useEffect(() => {
    getValue<Address>('address').then(storedAddress =>
      setAddress(storedAddress),
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const {
    data: projects = [],
    isLoading: projectsIsLoading,
    isError,
  } = useGetProjectsQuery({
    sortBy: 'publication_date',
    sortOrder: 'desc',
  })

  if (projectsIsLoading || isAddressLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (address || isSearching || !projects.length) {
    return null
  }

  const renderItem = ({item: project}: {item: Project}) => (
    <ProjectCard
      imageSource={mapImageSources(project.images[0].sources)}
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
