import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'
import {color} from '../tokens'

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

  const Section = ({title, text}: {title: string; text?: string}) =>
    text ? (
      <>
        <Title level={2} prose text={title} />
        <Text>{text}</Text>
      </>
    ) : null

  return (
    <ScrollView>
      <Image source={project.imageSource} style={styles.image} />
      <View style={styles.screen}>
        <Title prose text={project.title} />
        {project.lead?.text && <Text>{project.lead?.text}</Text>}
        <Section title="Wat" text={project.body?.what} />
        <Section title="Waar" text={project.body?.where} />
        <Section title="Wanneer" text={project.body?.when} />
      </View>
      {project.contact && (
        <View style={styles.contact}>
          <Title inverse level={2} prose text="Contact" />
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
            <Text inverse>{item}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contact: {
    backgroundColor: color.secondary.main,
    color: color.bright.main,
    padding: 15,
  },
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
  screen: {
    padding: 15,
  },
})
