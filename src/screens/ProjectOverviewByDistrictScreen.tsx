import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Gutter} from '../components/ui'
import {districts} from '../data/districts'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {size} from '../tokens'
import {ProjectOverviewItem} from '../types/project'

type ProjectOverviewByDistrictScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectOverviewByDistrict'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectOverviewByDistrictScreenRouteProp
}

export const ProjectOverviewByDistrictScreen = ({navigation, route}: Props) => {
  const districtId = route.params.id

  const {data: projects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        district_id: districtId,
      },
    },
  })

  const renamedProjects: ProjectOverviewItem[] | undefined = projects?.map(
    project => {
      let [title, subtitle] = project.title.split(',')
      if (!subtitle) {
        ;[title, subtitle] = project.title.split(':')
      }
      return {
        ...project,
        title: title,
        subtitle: subtitle && subtitle[1].toUpperCase() + subtitle.slice(2),
      }
    },
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: districts.find(d => d.id === districtId)?.name,
    })
  })

  return (
    <Box>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={renamedProjects}
          ItemSeparatorComponent={() => <Gutter height={size.spacing.md} />}
          keyExtractor={item => item.identifier.toString()}
          renderItem={({item}) => (
            <ProjectCard
              imageSource={{
                uri: item.images[0].sources['460px'].url,
              }}
              onPress={() =>
                navigation.navigate('ProjectDetail', {id: item.identifier})
              }
              subtitle={item.subtitle}
              title={item.title}
            />
          )}
        />
      )}
    </Box>
  )
}
