import {List} from '@amsterdam/asc-assets'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {ProjectsItem} from '../../../../types'
import {ProjectsRouteName} from '../../routes'
import {ProjectManagerScreenNavigationProps} from '../../screens'
import {ProjectTitle} from '../project'
import {Theme, useThemable} from '@/themes'

type Props = {
  projects: ProjectsItem[] | undefined
}

export const ProjectManagerProjects = ({projects}: Props) => {
  const navigation = useNavigation<ProjectManagerScreenNavigationProps>()
  const styles = useThemable(createStyles)

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
            navigation.navigate(ProjectsRouteName.project, {
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

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    button: {
      paddingVertical: size.spacing.sm,
    },
  })
