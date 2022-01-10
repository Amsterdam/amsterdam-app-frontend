import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {MenuStackParams} from '../app/navigation'
import {menuRoutes} from '../app/navigation/routes'
import {ProjectCard} from '../components/features/project'
import {Box, Button, PleaseWait, Text, Title} from '../components/ui'
import {Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {size} from '../tokens'
import {District, ProjectOverviewItem} from '../types'

type Props = {
  navigation: StackNavigationProp<MenuStackParams, 'ProjectDetail'>
}

export const ProjectOverviewScreen = ({navigation}: Props) => {
  const {projectOverviewByDistrict, projectDetail} = menuRoutes

  const {data: districts, isLoading: isDistrictsLoading} = useFetch<District[]>(
    {
      url: getEnvironment().apiUrl + '/districts',
    },
  )

  const {
    data: projects,
    hasError,
    isLoading: isProjectsLoading,
  } = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  const projectsByDistrict = districts?.map(district => ({
    id: district.id,
    title: district.name,
    data: projects?.filter(project => project.district_id === district.id),
  }))

  if (isDistrictsLoading || isProjectsLoading) {
    return <PleaseWait />
  }

  if (hasError) {
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
      data={projectsByDistrict}
      keyExtractor={(item, index) => `${item}${index}`}
      ItemSeparatorComponent={item =>
        item.leadingItem.data && item.leadingItem.data.length > 0 ? (
          <Gutter height="md" />
        ) : null
      }
      renderItem={({item: districtItem}) => {
        return districtItem.data && districtItem.data.length > 0 ? (
          <React.Fragment key={districtItem.id}>
            <View style={styles.titleRow}>
              <Title level={2} text={districtItem.title} />
              <Button
                onPress={() =>
                  navigation.navigate(projectOverviewByDistrict.name, {
                    id: districtItem.id,
                  })
                }
                variant="text"
                text="Ga naar overzicht"
              />
            </View>
            <FlatList
              data={districtItem.data}
              horizontal
              ItemSeparatorComponent={() => <Gutter width="sm" />}
              keyExtractor={item => item.identifier}
              renderItem={({item: projectItem}) => (
                <ProjectCard
                  onPress={() =>
                    navigation.navigate(projectDetail.name, {
                      id: projectItem.identifier,
                    })
                  }
                  imageSource={{
                    uri: projectItem.images[0].sources['460px'].url,
                  }}
                  subtitle={projectItem.subtitle ?? undefined}
                  title={projectItem.title}
                  width={18 * size.spacing.md}
                />
              )}
              style={styles.projects}
            />
          </React.Fragment>
        ) : null
      }}
    />
  )
}

const styles = StyleSheet.create({
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: size.spacing.md,
    marginTop: size.spacing.md,
  },
  projects: {
    paddingLeft: size.spacing.md,
  },
})
