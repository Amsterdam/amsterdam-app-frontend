import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {ProjectManagerSummary} from '@/modules/construction-work/components/project-manager'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {module as homeModule} from '@/modules/home'
import {HomeRouteName} from '@/modules/home/routes'
import {Theme, useThemable} from '@/themes'

export type ProjectManagerScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
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
