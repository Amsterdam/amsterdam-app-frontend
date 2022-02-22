import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useLayoutEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {ProjectCard} from '../../components/features/project'
import {NonScalingHeaderTitle, PleaseWait} from '../../components/ui'
import {DeviceContext} from '../../providers'
import {useGetDistrictsQuery, useGetProjectsQuery} from '../../services'
import {layoutStyles} from '../../styles'
import {size} from '../../tokens'
import {mapImageSources} from '../../utils'

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

  const {data: districts, isLoading: isDistrictsLoading} =
    useGetDistrictsQuery()

  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery({
    districtId,
    fields: ['identifier', 'images', 'subtitle', 'title'],
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
              style={layoutStyles.grow}
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
