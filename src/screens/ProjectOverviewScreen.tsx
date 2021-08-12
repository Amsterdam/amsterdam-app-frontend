import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Gutter, ScreenWrapper, Title} from '../components/ui'
import {districts as districtsData} from '../data/projects'
import {useFetch} from '../hooks/useFetch'
import {color, size} from '../tokens'
import {Project} from '../types/project'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

type ProjectOverviewResponse = {
  category: string
  feedid: string
  publication_date: string
  modification_date: string
  image_url: string
  title: string
  content: string
  source_url: string
  related_articles: string
  author: string
  photo_author: string
  images: []
}[]

export const ProjectOverviewScreen = ({navigation}: Props) => {
  const bruggenResponse = useFetch<ProjectOverviewResponse>({
    url: 'https://www.amsterdam.nl/projecten/bruggen/maatregelen-vernieuwen-bruggen/?new_json=true',
    options: {},
  })

  const kademurenResponse = useFetch<ProjectOverviewResponse>({
    url: 'https://www.amsterdam.nl/projecten/kademuren/maatregelen-vernieuwing/?new_json=true',
    options: {},
  })

  const projects: Project[] = [
    ...bruggenResponse.data,
    ...kademurenResponse.data,
  ]
    .sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
    .map(({feedid, title}, index, array) => ({
      districtId: Math.ceil((index / array.length) * districtsData.length),
      id: index,
      title,
      url: feedid,
    }))

  const districts = districtsData.map(district => ({
    id: district.id,
    title: district.name,
    data: projects.filter(project => project.districtId === district.id),
  }))

  return (
    <ScreenWrapper>
      {bruggenResponse.isLoading || kademurenResponse.isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList
          data={districts}
          keyExtractor={(item, index) => `${item}${index}`}
          ItemSeparatorComponent={item =>
            item.leadingItem.data.length > 0 ? (
              <Gutter height={size.spacing.lg} />
            ) : null
          }
          renderItem={({item: districtItem}) => {
            return districtItem.data.length > 0 ? (
              <React.Fragment key={districtItem.id}>
                <View style={styles.titleRow}>
                  <Title level={2} text={districtItem.title} />
                </View>
                <FlatList
                  data={districtItem.data}
                  horizontal
                  ItemSeparatorComponent={() => (
                    <Gutter width={size.spacing.sm} />
                  )}
                  keyExtractor={item => item.id + item.title}
                  renderItem={({item: projectItem}) => (
                    <View style={styles.project}>
                      <ProjectCard
                        onPress={() =>
                          navigation.navigate('ProjectDetail', {
                            url: projectItem.url,
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
