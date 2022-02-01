import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {SettingsContext} from '../../../providers'
import {color, size} from '../../../tokens'
import {ProjectTitles} from '../../../types'
import {accessibleText} from '../../../utils'
import {Box, Divider, SingleSelectable, Text, TextButton} from '../../ui'
import {Row} from '../../ui/layout'

export const AuthorizedProjects = () => {
  const {settings} = useContext(SettingsContext)
  const projectManagerSettings = settings && settings['project-manager']

  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  const [projectTitles, setProjectTitles] = useState<
    ProjectTitles[] | undefined
  >()

  // Retrieve all projects to allow displaying their titles
  const projectsApi = useFetch<ProjectTitles[]>({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        fields: 'identifier,subtitle,title',
      },
    },
  })

  useEffect(() => {
    projectsApi.data && setProjectTitles(projectsApi.data)
  }, [projectsApi.data])

  const authorisedProjects = projectTitles?.filter(project =>
    projectManagerSettings?.projects.includes(project.identifier),
  )

  return projectManagerSettings && authorisedProjects ? (
    <Box>
      <Text small>Uw bouwprojecten</Text>
      <View style={styles.container}>
        <Divider />
        {authorisedProjects.map(project => (
          <TouchableOpacity
            key={project.identifier}
            onPress={() =>
              navigation.navigate(routes.projectDetail.name, {
                id: project.identifier,
              })
            }>
            <Box background="white" insetHorizontal="md" insetVertical="sm">
              <Row align="between" gutter="md" valign="center">
                <SingleSelectable
                  accessibilityRole="header"
                  label={accessibleText(
                    project.title,
                    project.subtitle || undefined,
                  )}>
                  {project.title && <Text large>{project.title}</Text>}
                  {project.subtitle && (
                    <Text secondary small>
                      {project.subtitle}
                    </Text>
                  )}
                </SingleSelectable>
                <View style={{width: 16, height: 16}}>
                  <ChevronRight fill={color.font.regular} />
                </View>
              </Row>
            </Box>
            <Divider />
          </TouchableOpacity>
        ))}
      </View>
      <Text small>Ontbreekt er een bouwproject?</Text>
      <TextButton emphasis text="Neem contact op met de redactie" />
    </Box>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    marginTop: size.spacing.sm,
    marginBottom: size.spacing.md,
    marginHorizontal: -size.spacing.md,
  },
})
