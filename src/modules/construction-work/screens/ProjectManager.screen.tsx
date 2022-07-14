import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Screen, ScrollView} from '@/components/ui/layout'
import {ProjectManagerSummary} from '@/modules/construction-work/components/project-manager'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {module as homeModule} from '@/modules/home'
import {HomeRouteName} from '@/modules/home/routes'

export type ProjectManagerScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName.projectManager
>

export type ProjectManagerScreenNavigationProps = StackNavigationProp<
  RootStackParams,
  ConstructionWorkRouteName.projectManager
>

type Props = {
  navigation: ProjectManagerScreenNavigationProps
  route: ProjectManagerScreenRouteProp
}

export const ProjectManagerScreen = ({navigation, route}: Props) => (
  <Screen>
    <ScrollView grow>
      <Column align="between">
        <ProjectManagerSummary routeParamsId={route.params.id} />
        <Box>
          <Button
            label="Sluit venster"
            onPress={() =>
              navigation.navigate(homeModule.slug, {screen: HomeRouteName.home})
            }
          />
        </Box>
      </Column>
    </ScrollView>
  </Screen>
)
