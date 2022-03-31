import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {useAsyncStorage} from '../../../hooks'
import {DeviceContext} from '../../../providers'
import {useGetProjectsByDistanceQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {Address as AddressType, Project} from '../../../types'
import {accessibleText, mapImageSources} from '../../../utils'
import {Box, PleaseWait, SomethingWentWrong, Text} from '../../ui'
import {Gutter} from '../../ui/layout'
import {ProjectCard, ProjectTraits} from '../project'
import {config, selectIsProjectsSearching} from './'

export const ProjectsByDistance = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()
  const device = useContext(DeviceContext)
  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const asyncStorage = useAsyncStorage()
  const [address, setAddress] = useState<AddressType | undefined>()
  const isSearching = useSelector(selectIsProjectsSearching)

  const params = address
    ? {
        address: address.centroid[1] ? '' : address.adres ?? '',
        lat: address.centroid[1] ?? 0,
        lon: address.centroid[0] ?? 0,
        radius: config.nearestProjectsRadius,
      }
    : undefined

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsByDistanceQuery(params ?? skipToken)

  useEffect(() => {
    asyncStorage
      .getValue<AddressType>('address')
      .then(storedAddress => setAddress(storedAddress))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isSearching || !address) {
    return null
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (!projects.length) {
    return (
      <Box>
        <Text>Geen projecten in de buurt.</Text>
      </Box>
    )
  }

  const renderListHeader = () => (
    <>
      <Box insetHorizontal="md">
        <Text accessibilityLabel={`Projecten dichtbij ${address.adres}`} intro>
          Dichtbij {address.adres}
        </Text>
        <Gutter height="md" />
      </Box>
    </>
  )

  const renderItem = ({item: project}: {item: Project}) => (
    <ProjectCard
      imageSource={mapImageSources(project.images[0].sources)}
      kicker={
        <ProjectTraits
          meter={project.meter}
          strides={project.strides}
          accessibilityLabel={accessibleText(
            [
              project.meter && `${project.meter} meter`,
              project.meter && project.strides && 'of',
              project.strides && `${project.strides} stappen`,
              'vanaf uw adres',
            ].join(' '),
          )}
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
