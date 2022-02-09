import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {getEnvironment} from '../../../../environment'
import {useFetch} from '../../../../hooks'
import {SettingsContext} from '../../../../providers'
import {color} from '../../../../tokens'
import {ProjectTitles} from '../../../../types'
import {accessibleText} from '../../../../utils'
import {Attention, Box, Divider, SingleSelectable, Text} from '../../../ui'
import {Row} from '../../../ui/layout'
import {ProjectTitle} from '../../project'
import {SettingsSection} from '../SettingsSection'

export const AuthorizedProjectsList = () => {
  const {settings} = useContext(SettingsContext)
  const projectManagerSettings = settings && settings['project-manager']
  const [projectTitles, setProjectTitles] = useState<
    ProjectTitles[] | undefined
  >()
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

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

  // Don’t render if user is not a project manager
  if (!projectManagerSettings) {
    return (
      <Box insetHorizontal="md">
        <Attention warning>
          <Text>U bent niet gemachtigd om pushberichten te sturen.</Text>
        </Attention>
      </Box>
    )
  }

  const authorisedProjects = projectTitles?.filter(project =>
    projectManagerSettings?.projects.includes(project.identifier),
  )

  return authorisedProjects ? (
    <SettingsSection title="Je bouwprojecten">
      {authorisedProjects.length ? (
        authorisedProjects.map((project, index) => (
          <TouchableOpacity
            key={project.identifier}
            onPress={() =>
              navigation.navigate(routes.projectDetail.name, {
                id: project.identifier,
              })
            }>
            <Box insetVertical="sm">
              <Row align="between" gutter="md" valign="center">
                <SingleSelectable
                  accessibilityRole="header"
                  label={accessibleText(
                    project.title,
                    project.subtitle ?? undefined,
                  )}>
                  <ProjectTitle
                    title={project.title}
                    subtitle={project.subtitle ?? undefined}
                  />
                </SingleSelectable>
                <View style={styles.icon}>
                  <ChevronRight fill={color.font.regular} />
                </View>
              </Row>
            </Box>
            {index < (authorisedProjects.length ?? 0) - 1 && <Divider />}
          </TouchableOpacity>
        ))
      ) : (
        <Text>Geen bouwprojecten gevonden.</Text>
      )}
    </SettingsSection>
  ) : null
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    aspectRatio: 1,
  },
})
