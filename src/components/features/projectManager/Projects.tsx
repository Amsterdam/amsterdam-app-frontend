import {useNavigation} from '@react-navigation/native'
import React, {Fragment} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {routes} from '../../../app/navigation/routes'
import {ProjectManagerScreenNavigationProps} from '../../../screens/projects'
import {size} from '../../../tokens'
import {Project} from '../../../types'
import {Divider} from '../../ui'
import {ProjectTitle} from '../project/ProjectTitle'

type Props = {
  projects: Project[] | undefined
}

export const ProjectManagerProjects = ({projects}: Props) => {
  const navigation = useNavigation<ProjectManagerScreenNavigationProps>()

  if (!projects || !projects.length) {
    return null
  }

  return (
    <>
      {projects.map(
        (authProject, index) =>
          authProject && (
            <Fragment key={authProject.identifier}>
              <TouchableOpacity
                accessibilityRole="button"
                key={authProject.identifier}
                onPress={() => {
                  authProject.identifier &&
                    navigation.navigate(routes.projectDetail.name, {
                      id: authProject.identifier,
                    })
                }}
                style={styles.button}>
                <ProjectTitle
                  title={authProject.title}
                  subtitle={authProject.subtitle ?? undefined}
                />
              </TouchableOpacity>
              {index < projects.length && <Divider />}
            </Fragment>
          ),
      )}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: size.spacing.sm,
  },
})
