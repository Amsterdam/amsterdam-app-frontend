import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../app/navigation'
import {Box, Button} from '../../../components/ui'
import {module as homeModule} from '../../home'
import {HomeRouteName} from '../../home/routes'
import {ProjectManagerSummary} from '../components/project-manager'
import {ConstructionWorkRouteName, ProjectsStackParams} from '../routes'
import {Theme, useThemable} from '@/themes'

export type ProjectManagerScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ConstructionWorkRouteName.projectManager
>

export type ProjectManagerScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  ConstructionWorkRouteName.projectManager
>

type Props = {
  navigation: ProjectManagerScreenNavigationProps
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.screenHeight}>
      <ProjectManagerSummary routeParamsId={route.params.id} />
      <Box>
        <Button
          text="Sluit venster"
          onPress={() =>
            navigation.navigate(homeModule.name, {screen: HomeRouteName.home})
          }
        />
      </Box>
    </View>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    screenHeight: {
      height: '100%',
      justifyContent: 'space-between',
      paddingBottom: size.spacing.md,
    },
  })
