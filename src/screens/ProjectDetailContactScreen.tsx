import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Button, Inset, ScreenWrapper, Text, Title} from '../components/ui'
import {Project, projects} from '../data/projects'
import {color} from '../tokens'
import {openMailUrl, openPhoneUrl} from '../utils'

type ProjectDetailContactScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  route: ProjectDetailContactScreenRouteProp
}

export const ProjectDetailContactScreen = ({route}: Props) => {
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
          <Title text="Contact" />
        </View>
        <Inset>
          {(project.contact?.name || project.contact?.jobDescription) && (
            <Text>
              {project.contact?.name}, {project.contact?.jobDescription}
            </Text>
          )}
          {project.contact?.phone && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => openPhoneUrl('project.contact?.phone')}
                text={`Bel ${project.contact?.firstName}`}
              />
            </View>
          )}
          {project.contact?.email && (
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => openMailUrl('project.contact?.email')}
                text={`Mail ${project.contact?.firstName}`}
              />
            </View>
          )}
          {project.contact?.list?.map(item => (
            <Text key={item}>– {item}</Text>
          ))}
        </Inset>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  insetWhite: {
    padding: 15,
    backgroundColor: color.tint.level1,
  },
})
