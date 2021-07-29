import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Gutter, ScreenWrapper} from '../components/ui'
import {size} from '../tokens'
import {Project, ProjectResponse} from '../types/project'

type ProjectOverviewByBoroughScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectOverviewByBorough'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectOverviewByBoroughScreenRouteProp
}

export const ProjectOverviewByBoroughScreen = ({navigation}: Props) => {
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
    .map(({feedid, image_url, title}, index) => ({
      boroughId: Math.ceil(7 * Math.random()),
      id: index,
      image: {uri: image_url},
      title,
      url: feedid,
    }))

  return (
    <ScreenWrapper>
      <Box>
        {isBruggenLoading || isKademurenLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={projects}
            ItemSeparatorComponent={() => <Gutter height={size.spacing.md} />}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProjectCard
                title={item.title}
                onPress={() =>
                  navigation.navigate('ProjectDetail', {url: item.url})
                }
              />
            )}
          />
        )}
      </Box>
    </ScreenWrapper>
  )
}
