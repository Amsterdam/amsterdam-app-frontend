import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Inset, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'
import {color} from '../tokens'

type ProjectDetailInformationScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  route: ProjectDetailInformationScreenRouteProp
}

export const ProjectDetailInformationScreen = ({route}: Props) => {
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
          <Title text="Informatie" />
        </View>
        <Inset>
          <Text margin>({project.title})</Text>
          {project.intro?.title && (
            <Title level={2} text={project.intro.title} />
          )}
          <Section
            title={project.intro?.title || 'Introductie'}
            text={project.intro?.text}
          />
          {project.intro?.link && (
            <Text margin>
              {project.intro.linkText}: {project.intro.link}
            </Text>
          )}
          <Section title="Wat gaat er gebeuren" text={project.body?.what} />
          <Section title="Waar" text={project.body?.where} />
        </Inset>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  insetWhite: {
    padding: 15,
    backgroundColor: color.tint.level1,
  },
})
