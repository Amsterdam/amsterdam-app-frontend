import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {DeviceContext} from '../../../providers'
import {useGetProjectsQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {mapImageSources} from '../../../utils'
import {PleaseWait} from '../../ui'
import {ProjectCard} from '../project'

type Props = {
  districtId: number
}

export const ProjectListForDistrict = ({districtId}: Props) => {
  const device = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'ProjectOverview'>>()
  const [gridWidth, setGridWidth] = useState(0)

  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery({
    districtId,
    fields: ['identifier', 'images', 'subtitle', 'title'],
  })

  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  if (isProjectsLoading) {
    return <PleaseWait />
  }

  return (
    <View
      onLayout={event => {
        setGridWidth(event.nativeEvent.layout.width)
      }}>
      {!!gridWidth && (
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
