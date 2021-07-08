import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {Alert, IconButton, Inset, ScreenWrapper, Section, Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
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
          <View style={styles.iconsRow}>
            <IconButton
              icon="info"
              label="Informatie"
              onPress={() =>
                navigation.navigate(routes.projectDetailInformation.name, {
                  id: project.id,
                }
              )}
            />
          </View>
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
  iconsRow: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  iconsRow: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  image: {
    height: 150,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
