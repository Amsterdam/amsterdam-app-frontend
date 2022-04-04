import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {routes} from '../../../app/navigation/routes'
import {ProjectManagerScreenNavigationProps} from '../../../screens/projects'
import {size} from '../../../tokens'
import {Project} from '../../../types'
import {List} from '../../ui'
import {ProjectTitle} from '../project'

type Props = {
  projects: Project[] | undefined
}

export const ProjectManagerProjects = ({projects}: Props) => {
  const navigation = useNavigation<ProjectManagerScreenNavigationProps>()

  if (!projects || !projects.length) {
    return null
  }

  return (
    <List>
      {projects.map(project => (
        <TouchableOpacity
          accessibilityRole="button"
          key={project.identifier}
          onPress={() => {
            navigation.navigate(routes.projectDetail.name, {
              id: project.identifier,
            })
          }}
          style={styles.button}>
          <ProjectTitle
            title={project.title}
            subtitle={project.subtitle ?? undefined}
          />
        </TouchableOpacity>
      ))}
    </List>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: size.spacing.sm,
  },
})
