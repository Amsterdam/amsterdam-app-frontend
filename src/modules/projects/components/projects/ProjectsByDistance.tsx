import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '../../../../app/navigation'
import {Edit} from '../../../../assets/icons'
import {
  Box,
  IconButton,
  PleaseWait,
  SomethingWentWrong,
} from '../../../../components/ui'
import {Gutter, Row} from '../../../../components/ui/layout'
import {Paragraph} from '../../../../components/ui/typography'
import {DeviceContext} from '../../../../providers'
import {useEnvironment} from '../../../../store'
import {selectTheme} from '../../../../themes'
import {size} from '../../../../tokens'
import {Project} from '../../../../types'
import {mapImageSources} from '../../../../utils'
import {selectAddress} from '../../../address/addressSlice'
import {AddressRouteName} from '../../../address/routes'
import {useGetProjectsByDistanceQuery} from '../../projects.service'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {ProjectCard, ProjectTraits} from '../project'
import {selectIsProjectsSearching} from './'
import {Icon} from '@/components/ui/media'

export const ProjectsByDistance = () => {
  const {primary: address} = useSelector(selectAddress)
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & ProjectsStackParams,
        ProjectsRouteName.projects
      >
    >()
  const {theme} = useSelector(selectTheme)
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

  const environment = useEnvironment()

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
        <Paragraph>Geen projecten in de buurt.</Paragraph>
      </Box>
    )
  }

  const renderListHeader = () => (
    <Box insetHorizontal="md">
      <Row gutter="sm" valign="center">
        <Paragraph accessibilityLabel={`Projecten dichtbij ${address.adres}`}>
          Dichtbij {address.adres}
        </Paragraph>
        <IconButton
          hitSlop={10}
          icon={
            <Icon size={32}>
              <Edit fill={theme.color.pressable.default.background} />
            </Icon>
          }
          onPress={
            // TODO Open as modal
            () =>
              navigation.navigate('AddressModule', {
                screen: AddressRouteName.addressForm,
              })
          }
        />
      </Row>
      <Gutter height="md" />
    </Box>
  )

  const renderItem = ({item: project}: {item: Project}) => (
    <ProjectCard
      imageSource={mapImageSources(project.images[0].sources, environment)}
      kicker={<ProjectTraits projectId={project.identifier} />}
      onPress={() =>
        navigation.navigate(ProjectsRouteName.projectDetail, {
          id: project.identifier,
        })
      }
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
  iconButton: {
    width: 24,
    aspectRatio: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
