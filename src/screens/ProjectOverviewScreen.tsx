import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Gutter, ScreenWrapper, Title} from '../components/ui'
import {districts as districtsData} from '../data/projects'
import {color, size} from '../tokens'
import {Project, ProjectResponse} from '../types/project'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
}

export const ProjectOverviewScreen = ({navigation}: Props) => {
  const [isBruggenLoading, setBruggenLoading] = useState(true)
  const [bruggenData, setBruggenData] = useState<ProjectResponse[]>([])
  const [isKademurenLoading, setKademurenLoading] = useState(true)
  const [kademurenData, setKademurenData] = useState<ProjectResponse[]>([])

  useEffect(() => {
    fetch(
      'https://www.amsterdam.nl/projecten/kademuren/maatregelen-vernieuwing/?new_json=true',
    )
      .then(response => response.json())
      .then(json => setBruggenData(json))
      .catch(error => console.error(error))
      .finally(() => setBruggenLoading(false))
  }, [])

  useEffect(() => {
    fetch(
      'https://www.amsterdam.nl/projecten/bruggen/maatregelen-vernieuwen-bruggen/?new_json=true',
    )
      .then(response => response.json())
      .then(json => setKademurenData(json))
      .catch(error => console.error(error))
      .finally(() => setKademurenLoading(false))
  }, [])

  const projects: Project[] = [...bruggenData, ...kademurenData]
    .sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
    .map(({feedid, title}, index) => ({
      districtId: Math.ceil(
        (index / (bruggenData.length + kademurenData.length)) *
          districtsData.length,
      ),
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
      {isBruggenLoading || isKademurenLoading ? (
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
          renderItem={({item}) => {
            return item.data.length > 0 ? (
              <React.Fragment key={item.id}>
                <View style={styles.titleRow}>
                  <Title level={2} text={item.title} />
                </View>

                <FlatList
                  data={item.data}
                  horizontal
                  ItemSeparatorComponent={() => (
                    <Gutter width={size.spacing.sm} />
                  )}
                  keyExtractor={item => item.id + item.title}
                  renderItem={({item}) => (
                    <View style={styles.project}>
                      <ProjectCard
                        onPress={() =>
                          navigation.navigate('ProjectDetail', {
                            url: item.url,
                          })
                        }
                        title={item.title}
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
