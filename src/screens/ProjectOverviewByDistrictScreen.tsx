import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features'
import {Box, Gutter, ScreenWrapper} from '../components/ui'
import {districts} from '../data/districts'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks/useFetch'
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
  const {data: projects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  const districtId = route.params.id

  useLayoutEffect(() => {
    navigation.setOptions({
      title: districts.find(d => d.id === districtId)?.name,
    })
  })

  const projectsInDistrict = projects?.filter(
    project => project.district_id === districtId,
  )

  return (
    <ScreenWrapper>
      <Box>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={projectsInDistrict}
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
                title={item.title}
              />
            )}
          />
        )}
      </Box>
    </ScreenWrapper>
  )
}
