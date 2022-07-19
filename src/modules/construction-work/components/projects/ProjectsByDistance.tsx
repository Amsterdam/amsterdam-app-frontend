import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/dist/query'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParams} from '@/app/navigation'
import {Edit} from '@/assets/icons'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressRouteName} from '@/modules/address/routes'
import {
  ProjectCard,
  ProjectTraits,
} from '@/modules/construction-work/components/shared'
import {articlesMaxAgeInDays} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {useSortProjects} from '@/modules/construction-work/hooks/useSortProjects'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectsItem} from '@/modules/construction-work/types'
import {ModuleSlugs} from '@/modules/slugs'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {Address} from '@/types'
import {accessibleText, mapImageSources} from '@/utils'

type ListHeaderProps = {
  address: string
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkRouteName.projects
  >
}

const ListHeader = ({address, navigation}: ListHeaderProps) => {
  const {color} = useTheme()

  return (
    <Box>
      <Row gutter="sm" valign="center">
        <Paragraph accessibilityLabel={`Werkzaamheden dichtbij ${address}`}>
          Dichtbij {address}
        </Paragraph>
        <IconButton
          accessibilityLabel="Wijzig het adres"
          icon={
            <Icon size={24}>
              <Edit fill={color.pressable.default.background} />
            </Icon>
          }
          onPress={
            // TODO Open as modal
            () =>
              navigation.navigate(ModuleSlugs.address, {
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
    RootStackParams,
    ConstructionWorkRouteName.projects
  >
  project: ProjectsItem
}

const ListItem = ({navigation, project}: ListItemProps) => {
  const environment = useEnvironment()
  const {followed, meter, recent_articles, strides} = project

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      kicker={
        <ProjectTraits
          accessibilityLabel={accessibleText(
            followed ? 'Volgend' : undefined,
            [
              meter && `${meter} meter`,
              meter && strides && 'of',
              strides && `${strides} stappen`,
              'vanaf uw adres',
            ].join(' '),
          )}
          {...{followed, meter, recent_articles, strides}}
        />
      }
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
    <EmptyMessage text="We hebben geen werkzaamheden gevonden dichtbij dit adres." />
  </Box>
)

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
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName.projects>
    >()
  const {sortProjects} = useSortProjects()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const params = {
    address: lat && lon ? '' : adres,
    articles_max_age: articlesMaxAgeInDays,
    fields: [
      'followed',
      'identifier',
      'images',
      'recent_articles',
      'subtitle',
      'title',
    ],
    lat,
    lon,
    sortBy: 'meter',
  }

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery(params ?? skipToken)

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <Column gutter="md">
      <FlatGrid
        data={sortProjects(projects)}
        itemContainerStyle={styles.itemContainer}
        itemDimension={itemDimension}
        keyboardDismissMode="on-drag"
        keyExtractor={project => project.identifier}
        ListEmptyComponent={ListEmptyMessage}
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
