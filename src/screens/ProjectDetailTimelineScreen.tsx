import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'
import {color, spacing} from '../tokens'

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
        <View style={styles.insetWhite}>
          <Title text="Tijdlijn" />
        </View>
        <Box>
          <Section title="Wanneer" text={project.body?.when} />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  insetWhite: {
    padding: spacing.md,
    backgroundColor: color.tint.level1,
  },
})
