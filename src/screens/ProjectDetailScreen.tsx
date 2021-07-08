import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {Image, ScrollView, StyleSheet} from 'react-native'
import {RootStackParamList} from '../../App'
import {Alert, Inset, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({route}: Props) => {
  const project: Project | undefined = projects.find(
    p => p.id === route.params.id,
  )

  if (!project) {
    return <Text>`Project ${route.params.id} niet gevonden.`</Text>
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <Image source={project.imageSource} style={styles.image} />
        <Inset>
          <Title margin text={project.title} />
          <Section title="Wanneer" text={project.body?.when} />
        </Inset>
        {project.contact && (
          <Alert background="red">
            <Title inverse level={2} margin text="Contact" />
            {(project.contact.name || project.contact.jobDescription) && (
              <Text inverse>
                {project.contact.name}, {project.contact.jobDescription}
              </Text>
            )}
            {project.contact.phone && (
              <Text inverse>{project.contact.phone}</Text>
            )}
            {project.contact.email && (
              <Text inverse>{project.contact.email}</Text>
            )}
            {project.contact.list?.map(item => (
              <Text key={item} inverse>
                – {item}
              </Text>
            ))}
          </Alert>
        )}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
