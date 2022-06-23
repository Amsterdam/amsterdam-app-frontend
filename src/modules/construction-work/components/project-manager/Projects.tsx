import {List} from '@amsterdam/asc-assets'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {ProjectTitle} from '@/modules/construction-work/components/project'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectManagerScreenNavigationProps} from '@/modules/construction-work/screens'
import {Theme, useThemable} from '@/themes'
import {ProjectsItem} from '@/types'

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
            navigation.navigate(ConstructionWorkRouteName.project, {
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
