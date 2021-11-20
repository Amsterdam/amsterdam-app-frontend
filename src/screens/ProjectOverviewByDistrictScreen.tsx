import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect, useState} from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {RootStackParamList} from '../../App'
import {ProjectCard} from '../components/features/project'
import {Box, NonScalingHeaderTitle} from '../components/ui'
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
  const [gridWidth, setGridWidth] = useState(0)
  const districtId = route.params.id

  const {data: projects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        'district-id': districtId,
      },
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NonScalingHeaderTitle
          text={districts.find(d => d.id === districtId)?.name ?? ''}
        />
      ),
    })
  })

  // We need to calculate widths because FlatList items don’t flex as expected
  const projectCardMinWidth = 280
  const numColumns = Math.floor(gridWidth / projectCardMinWidth)
  const gutterWidth = size.spacing.md
  const itemWidth = (gridWidth - (numColumns + 1) * gutterWidth) / numColumns

  return (
    <Box
      onLayout={event => {
        setGridWidth(event.nativeEvent.layout.width)
      }}>
      {isLoading || !gridWidth ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          key={`re-render-${numColumns}`}
          data={projects}
          ItemSeparatorComponent={() => <Gutter height={gutterWidth} />}
          keyExtractor={item => item.identifier.toString()}
          numColumns={numColumns}
          renderItem={({item, index}) => (
            <>
              <ProjectCard
                imageSource={{
                  uri: item.images[0].sources['460px'].url,
                }}
                onPress={() =>
                  navigation.navigate('ProjectDetail', {id: item.identifier})
                }
                subtitle={item.subtitle}
                title={item.title}
                width={itemWidth}
              />
              {index % numColumns < numColumns - 1 && (
                <Gutter width={gutterWidth} />
              )}
            </>
          )}
        />
      )}
    </Box>
  )
}
