import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, Button, ScreenWrapper, Text, Title} from '../components/ui'
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
        <Box>
          <View style={styles.insetWhite}>
            {project.contact?.list ? (
              project.contact?.list?.map(item => (
                <Text key={item}>– {item}</Text>
              ))
            ) : (
              <>
                {project.contact?.name && (
                  <Title level={4} margin text={project.contact?.name} />
                )}
                {project.contact?.jobDescription && (
                  <Text margin>{project.contact?.jobDescription}</Text>
                )}
                {project.contact?.phone && (
                  <View style={styles.buttonContainer}>
                    <Button
                      icon={<Phone fill={color.tint.level1} />}
                      onPress={() => openPhoneUrl('project.contact?.phone')}
                      text={`Bel ${project.contact?.firstName}`}
                    />
                  </View>
                )}
                {project.contact?.email && (
                  <View style={styles.buttonContainer}>
                    <Button
                      icon={<Email fill={color.tint.level1} />}
                      onPress={() => openMailUrl('project.contact?.email')}
                      text={`E-mail ${project.contact?.firstName}`}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </Box>
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
