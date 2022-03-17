import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {DeviceContext} from '../../../../providers'
import {useGetProjectsSearchQuery} from '../../../../services'
import {size} from '../../../../tokens'
import {Attention, Box, PleaseWait, Text} from '../../../ui'
import {ListHeader} from './ListHeader'
import {Result} from './Result'

type Props = {
  text: string
}

export const Results = ({text}: Props) => {
  const device = useContext(DeviceContext)
  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsSearchQuery({
    fields: ['identifier', 'images', 'subtitle', 'title'],
    text,
    queryFields: ['subtitle', 'title'],
  })

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return (
      <Box>
        <Attention warning>
          <Text intro>Sorry…</Text>
          <Text>Er ging iets mis.</Text>
        </Attention>
      </Box>
    )
  }

  return (
    <FlatGrid
      data={projects}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={project => project.identifier}
      ListHeaderComponent={<ListHeader projectsLength={projects.length} />}
      renderItem={({item}) => <Result project={item} />}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
