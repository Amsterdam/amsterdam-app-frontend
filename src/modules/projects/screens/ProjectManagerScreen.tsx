import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {Box, Button} from '../../../components/ui'
import {size} from '../../../tokens'
import {ProjectManagerSummary} from '../components/project-manager'

export type ProjectManagerScreenRouteProp = RouteProp<
  StackParams,
  'ProjectManager'
>

export type ProjectManagerScreenNavigationProps = StackNavigationProp<
  StackParams,
  'ProjectManager'
>

type Props = {
  navigation: ProjectManagerScreenNavigationProps
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => (
  <View style={styles.screenHeight}>
    <ProjectManagerSummary routeParamsId={route.params.id} />
    <Box>
      <Button
        text="Sluit venster"
        onPress={() => navigation.navigate('Home')}
      />
    </Box>
  </View>
)

const styles = StyleSheet.create({
  screenHeight: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: size.spacing.md,
  },
})
