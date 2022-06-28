import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParamList} from '@/app/navigation'
import {Edit} from '@/assets/icons'
import {Box, IconButton, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressRouteName} from '@/modules/address/routes'
import {sanitizeProjects} from '@/modules/construction-work/components/projects'
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
import {Address, ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

type ListHeaderProps = {
  address: string
  navigation: StackNavigationProp<
    RootStackParamList & ProjectsStackParams,
    ConstructionWorkRouteName.projects
  >
}

const ListHeader = ({address, navigation}: ListHeaderProps) => {
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

type Props = {
  address: Address
}

export const ProjectsByDistance = ({
  address: {
    centroid: [lon = 0, lat = 0],
    adres,
  },
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & ProjectsStackParams,
        ConstructionWorkRouteName.projects
      >
    >()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const params = {
    address: lat && lon ? '' : adres,
    lat,
    lon,
  }

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsByDistanceQuery(params ?? skipToken)

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
        ListEmptyComponent={
          <>
            <Box insetHorizontal="md">
              <EmptyMessage text="We hebben geen projecten gevonden voor dit adres." />
            </Box>
          </>
        }
        ListHeaderComponent={
          <ListHeader address={adres} navigation={navigation} />
        }
        renderItem={({item}) => (
          <ListItem navigation={navigation} project={item} />
        )}
        scrollIndicatorInsets={{right: Number.MIN_VALUE}}
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
