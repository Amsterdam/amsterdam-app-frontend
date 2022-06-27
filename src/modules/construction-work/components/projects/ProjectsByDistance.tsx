import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '@/app/navigation'
import {Edit} from '@/assets/icons'
import {Box, IconButton, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {selectAddress} from '@/modules/address/addressSlice'
import {AddressRouteName} from '@/modules/address/routes'
import {
  sanitizeProjects,
  selectIsProjectsSearching,
} from '@/modules/construction-work/components/projects'
import {
  ProjectCard,
  ProjectTraits,
} from '@/modules/construction-work/components/shared'
import {useGetProjectsByDistanceQuery} from '@/modules/construction-work/construction-work.service'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

type ProjectsByDistanceListHeaderProps = {
  address: string
  navigation: StackNavigationProp<
    RootStackParamList & ProjectsStackParams,
    ConstructionWorkRouteName.projects
  >
}

const ProjectsByDistanceListHeader = ({
  address,
  navigation,
}: ProjectsByDistanceListHeaderProps) => {
  const {color} = useTheme()

  return (
    <Box>
      <Row gutter="sm" valign="center">
        <Paragraph accessibilityLabel={`Projecten dichtbij ${address}`}>
          Dichtbij {address}
        </Paragraph>
        <IconButton
          accessibilityLabel="Wijzig het adres"
          icon={
            <Icon size={32}>
              <Edit fill={color.pressable.default.background} />
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
    </Box>
  )
}

type ProjectsByDistanceListItemProps = {
  navigation: StackNavigationProp<
    RootStackParamList & ProjectsStackParams,
    ConstructionWorkRouteName.projects
  >
  project: ProjectsItem
}

const ProjectsByDistanceListItem = ({
  navigation,
  project,
}: ProjectsByDistanceListItemProps) => {
  const environment = useEnvironment()

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      kicker={<ProjectTraits projectId={project.identifier} />}
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

const ProjectsByDistanceNoResults = () => (
  <Box>
    <Paragraph>Geen projecten in de buurt.</Paragraph>
  </Box>
)

export const ProjectsByDistance = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & ProjectsStackParams,
        ConstructionWorkRouteName.projects
      >
    >()

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
          <ProjectsByDistanceListHeader
            address={address.adres}
            navigation={navigation}
          />
        }
        renderItem={({item}) => (
          <ProjectsByDistanceListItem navigation={navigation} project={item} />
        )}
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
