import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {PleaseWait, SomethingWentWrong} from '@/components/ui'
import {Column} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/addressSlice'
import {
  ProjectsByDistanceListHeader,
  ProjectsByDistanceListItem,
  ProjectsByDistanceNoResults,
  sanitizeProjects,
  selectIsProjectsSearching,
} from '@/modules/construction-work/components/projects'
import {useGetProjectsByDistanceQuery} from '@/modules/construction-work/construction-work.service'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

export const ProjectsByDistance = () => {
  const {primary: address} = useSelector(selectAddress)
  const {size} = useTheme()
  const {fontScale} = useContext(DeviceContext)
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const isSearching = useSelector(selectIsProjectsSearching)

  const params = address
    ? {
        address: address.centroid[1] ? '' : address.adres ?? '',
        lat: address.centroid[1] ?? 0,
        lon: address.centroid[0] ?? 0,
      }
    : undefined

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsByDistanceQuery(params ?? skipToken)

  if (isSearching || !address) {
    return null
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <Column gutter="md">
      <FlatGrid
        data={sanitizeProjects(projects)}
        itemContainerStyle={styles.itemContainer}
        itemDimension={itemDimension}
        keyExtractor={project => project.identifier}
        ListEmptyComponent={ProjectsByDistanceNoResults}
        ListHeaderComponent={
          <ProjectsByDistanceListHeader address={address.adres} />
        }
        renderItem={({item}) => <ProjectsByDistanceListItem project={item} />}
        spacing={size.spacing.md}
      />
    </Column>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    width: 24,
    aspectRatio: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
