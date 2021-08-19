import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Button, Gutter, ScreenWrapper, Title} from '../components/ui'
import {districts} from '../data/districts'
import {useFetch} from '../hooks/useFetch'
import {color, size} from '../tokens'
import {ProjectOverviewItem} from '../types'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

export const ProjectOverviewScreen = ({navigation}: Props) => {
  const {data: projects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: 'http://localhost:8000/api/v1/projects',
  })

  const projectsByDistrict = districts.map(district => ({
    id: district.id,
    title: district.name,
    data: projects?.filter(project => project.district_id === district.id),
  }))

  return (
    <ScreenWrapper>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          data={projectsByDistrict}
          keyExtractor={(item, index) => `${item}${index}`}
          ItemSeparatorComponent={item =>
            item.leadingItem.data && item.leadingItem.data.length > 0 ? (
              <Gutter height={size.spacing.lg} />
            ) : null
          }
          renderItem={({item: districtItem}) => {
            return districtItem.data && districtItem.data.length > 0 ? (
              <React.Fragment key={districtItem.id}>
                <View style={styles.titleRow}>
                  <Title level={2} text={districtItem.title} />
                  <Button
                    onPress={() =>
                      navigation.navigate(
                        routes.projectOverviewByDistrict.name,
                        {
                          id: districtItem.id,
                        },
                      )
                    }
                    variant="text"
                    text="Ga naar overzicht"
                  />
                </View>
                <FlatList
                  data={districtItem.data}
                  horizontal
                  ItemSeparatorComponent={() => (
                    <Gutter width={size.spacing.sm} />
                  )}
                  keyExtractor={item => item.identifier}
                  renderItem={({item: projectItem}) => (
                    <View style={styles.project}>
                      <ProjectCard
                        onPress={() =>
                          navigation.navigate(routes.projectDetail.name, {
                            id: projectItem.identifier,
                          })
                        }
                        title={projectItem.title}
                        width={280}
                      />
                    </View>
                  )}
                  style={styles.projects}
                />
              </React.Fragment>
            ) : null
          }}
        />
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: size.spacing.md,
  },
  projects: {
    paddingLeft: size.spacing.md,
  },
  project: {
    backgroundColor: color.background.lighter,
  },
})
