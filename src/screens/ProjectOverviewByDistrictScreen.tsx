import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useLayoutEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../app/navigation'
import {routes} from '../app/navigation/routes'
import {ProjectCard} from '../components/features/project'
import {NonScalingHeaderTitle, PleaseWait} from '../components/ui'
import {getEnvironment} from '../environment'
import {useFetch} from '../hooks'
import {DeviceContext} from '../providers'
import {size} from '../tokens'
import {District, ProjectOverviewItem} from '../types'
import {mapImageSources} from '../utils'

type ProjectOverviewByDistrictScreenRouteProp = RouteProp<
  StackParams,
  'ProjectOverviewByDistrict'
>

type Props = {
  navigation: StackNavigationProp<StackParams, 'ProjectDetail'>
  route: ProjectOverviewByDistrictScreenRouteProp
}

export const ProjectOverviewByDistrictScreen = ({navigation, route}: Props) => {
  const device = useContext(DeviceContext)
  const [gridWidth, setGridWidth] = useState(0)
  const districtId = route.params.id

  const {data: districts, isLoading: isDistrictsLoading} = useFetch<District[]>(
    {
      url: getEnvironment().apiUrl + '/districts',
    },
  )

  const {data: projects, isLoading: isProjectsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
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
          text={districts?.find(d => d.id === districtId)?.name ?? ''}
        />
      ),
    })
  })

  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  return (
    <View
      onLayout={event => {
        setGridWidth(event.nativeEvent.layout.width)
      }}>
      {isDistrictsLoading || isProjectsLoading || gridWidth === 0 ? (
        <PleaseWait />
      ) : (
        <FlatGrid
          data={projects ?? []}
          itemContainerStyle={styles.alignment}
          itemDimension={itemDimension}
          keyExtractor={item => item.identifier}
          renderItem={({item}) => (
            <ProjectCard
              imageSource={mapImageSources(item.images[0].sources)}
              onPress={() =>
                navigation.navigate(routes.projectDetail.name, {
                  id: item.identifier,
                })
              }
              subtitle={item.subtitle ?? undefined}
              title={item.title}
            />
          )}
          spacing={size.spacing.sm}
          style={styles.grid}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  alignment: {
    justifyContent: 'flex-start',
  },
  grid: {
    margin: size.spacing.sm,
  },
})
