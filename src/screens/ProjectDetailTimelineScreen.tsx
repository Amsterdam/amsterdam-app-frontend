import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'

type ProjectDetailTimelineScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  route: ProjectDetailTimelineScreenRouteProp
}

export const ProjectDetailTimelineScreen = ({route}: Props) => {
  const project: Project | undefined = projects.find(
    p => p.id === route.params.id,
  )

  if (!project) {
    return <Text>`Project ${route.params.id} niet gevonden.`</Text>
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <Title text="Tijdlijn" />
        </Box>
        <Box>
          <Section title="Wanneer" text={project.body?.when} />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}
