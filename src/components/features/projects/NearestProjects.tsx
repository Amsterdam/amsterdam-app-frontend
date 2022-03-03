import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {Strides} from '../../../assets/icons'
import {DeviceContext, SettingsContext} from '../../../providers'
import {useGetNearestProjectsQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {color, size} from '../../../tokens'
import {Box, PleaseWait, Text, Title, Trait} from '../../ui'
import {Gutter, Row} from '../../ui/layout'
import {Address} from '../address'
import {ProjectCard} from '../project'
import {config} from './'

export const NearestProjects = () => {
  const device = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const {settings} = useContext(SettingsContext)
  const {address} = {...settings}

  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const {data: projects, isLoading} = useGetNearestProjectsQuery({
    address: address?.centroid[1] ? '' : address?.adres ?? '',
    lat: address?.centroid[1] ?? 0,
    lon: address?.centroid[0] ?? 0,
    radius: config.nearestProjectsRadius,
  })

  if (isLoading) {
    return <PleaseWait />
  }

  if (!address) {
    return (
      <Box>
        <Address />
      </Box>
    )
  }

  if (!projects?.length) {
    return (
      <Box>
        <Text>Geen projecten in de buurt.</Text>
      </Box>
    )
  }

  return (
    <>
      <Gutter height="md" />
      <Box insetHorizontal="md">
        <Title level={4} text={`Dichtbij ${address.adres}`} />
      </Box>
      <FlatGrid
        data={projects}
        itemContainerStyle={styles.alignment}
        itemDimension={itemDimension}
        keyExtractor={project => project.project_id}
        renderItem={({item: project}) => (
          <ProjectCard
            kicker={
              <Row gutter="xs">
                <Trait
                  icon={<Location fill={color.font.primary} />}
                  label={`${project.meter} meter,`}
                />
                <Trait
                  icon={<Strides fill={color.font.primary} />}
                  label={`${project.strides} stappen`}
                />
              </Row>
            }
            onPress={() =>
              navigation.navigate(routes.projectDetail.name, {
                id: project.project_id,
              })
            }
            style={layoutStyles.grow}
            title={project.name}
          />
        )}
        spacing={size.spacing.sm}
        style={styles.grid}
      />
    </>
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
