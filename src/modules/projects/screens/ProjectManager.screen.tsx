import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../app/navigation'
import {Box, Button} from '../../../components/ui'
import {size} from '../../../tokens'
import {HomeRouteName} from '../../home/routes'
import {ProjectManagerSummary} from '../components/project-manager'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

export type ProjectManagerScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectManager
>

export type ProjectManagerScreenNavigationProps = StackNavigationProp<
  RootStackParamList & ProjectsStackParams,
  ProjectsRouteName.projectManager
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
        onPress={() => navigation.navigate('HomeModule', HomeRouteName.home)}
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
