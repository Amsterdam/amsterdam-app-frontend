import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {DeviceContext} from '../../../providers'
import {useGetProjectsQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {mapImageSources} from '../../../utils'
import {Box, PleaseWait, Text} from '../../ui'
import {ProjectCard} from '../project'

type Props = {
  districtId: number
}

export const ProjectsForDistrict = ({districtId}: Props) => {
  const device = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery({
    districtId,
    fields: ['identifier', 'images', 'subtitle', 'title'],
  })

  if (isProjectsLoading) {
    return <PleaseWait />
  }

  if (!projects?.length) {
    return (
      <Box>
        <Text>Geen projecten voor dit stadsdeel.</Text>
      </Box>
    )
  }

  return (
    <FlatGrid
      data={projects}
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
          style={layoutStyles.grow}
          subtitle={item.subtitle ?? undefined}
          title={item.title}
        />
      )}
      spacing={size.spacing.sm}
      style={styles.grid}
    />
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
