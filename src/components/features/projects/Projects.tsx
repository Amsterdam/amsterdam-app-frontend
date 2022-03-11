import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {useGetDistrictsQuery, useGetProjectsQuery} from '../../../services'
import {size} from '../../../tokens'
import {mapImageSources} from '../../../utils'
import {Box, PleaseWait, Text, Title} from '../../ui'
import {Column, Gutter} from '../../ui/layout'
import {ProjectCard} from '../project'

export const Projects = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const {data: districts, isLoading: isDistrictsLoading} =
    useGetDistrictsQuery()

  const {
    data: projects,
    isError: isProjectsError,
    isLoading: isProjectsLoading,
  } = useGetProjectsQuery({
    fields: ['district_id', 'identifier', 'images', 'subtitle', 'title'],
  })

  const projectsForDistrict = districts?.map(district => ({
    id: district.id,
    title: district.name,
    data: projects?.filter(project => project.district_id === district.id),
  }))

  if (isDistrictsLoading || isProjectsLoading) {
    return <PleaseWait />
  }

  if (isProjectsError) {
    return (
      <Box>
        <Box background="invalid">
          <Title inverse text="Er ging iets mis" />
          <Text inverse>Heb je de backend aangezet…?</Text>
        </Box>
      </Box>
    )
  }

  return (
    <FlatList
      data={projectsForDistrict}
      keyExtractor={(item, index) => `${item}${index}`}
      ItemSeparatorComponent={item =>
        item.leadingItem.data && item.leadingItem.data.length > 0 ? (
          <Gutter height="md" />
        ) : null
      }
      renderItem={({item: districtItem}) => {
        return districtItem.data && districtItem.data.length > 0 ? (
          <Column gutter="sm" key={districtItem.id}>
            <View style={styles.titleRow}>
              <Title level={2} text={districtItem.title} />
            </View>
            <FlatList
              data={districtItem.data}
              horizontal
              ItemSeparatorComponent={() => <Gutter width="sm" />}
              keyExtractor={item => item.identifier}
              renderItem={({item: projectItem}) => (
                <ProjectCard
                  onPress={() =>
                    navigation.navigate(routes.projectDetail.name, {
                      id: projectItem.identifier,
                    })
                  }
                  imageSource={mapImageSources(projectItem.images[0].sources)}
                  subtitle={projectItem.subtitle ?? undefined}
                  title={projectItem.title}
                  width={18 * size.spacing.md}
                />
              )}
              style={styles.projects}
            />
          </Column>
        ) : null
      }}
    />
  )
}

const styles = StyleSheet.create({
  titleRow: {
    marginHorizontal: size.spacing.md,
    marginTop: size.spacing.md,
  },
  projects: {
    paddingLeft: size.spacing.md,
  },
})
