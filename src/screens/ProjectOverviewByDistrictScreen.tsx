import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features/project'
import {Box} from '../components/ui'
import {Gutter} from '../components/ui/layout'
import {districts} from '../data/districts'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {size} from '../tokens'
import {ProjectOverviewItem} from '../types'

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
          data={projects}
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
