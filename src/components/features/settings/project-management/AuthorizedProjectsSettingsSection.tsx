import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment, useContext, useEffect, useState} from 'react'
import {SettingsLink, SettingsSection} from '../'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {SettingsContext} from '../../../../providers'
import {useGetProjectsQuery} from '../../../../services'
import {Projects} from '../../../../types'
import {accessibleText} from '../../../../utils'
import {
  Attention,
  Box,
  Divider,
  PleaseWait,
  SingleSelectable,
  Text,
} from '../../../ui'
import {ProjectTitle} from '../../project'

export const AuthorizedProjectsSettingsSection = () => {
  const {settings} = useContext(SettingsContext)
  const projectManagerSettings = settings && settings['project-manager']
  const [authorizedProjects, setAuthorizedProjects] = useState<Projects>()
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery({
    fields: ['identifier', 'subtitle', 'title'],
  })

  useEffect(() => {
    if (projects && projectManagerSettings) {
      setAuthorizedProjects(
        projects.filter(project =>
          projectManagerSettings.projects.includes(project.identifier),
        ),
      )
    }
  }, [projects, projectManagerSettings])

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

  if (isProjectsLoading) {
    return <PleaseWait />
  }

  if (!projects || !authorizedProjects) {
    return null
  }

  return (
    <SettingsSection title="Je bouwprojecten">
      {authorizedProjects.length ? (
        authorizedProjects.map((project, index) => (
          <Fragment key={project.identifier}>
            <SettingsLink
              onPress={() =>
                navigation.navigate(routes.projectDetail.name, {
                  id: project.identifier,
                })
              }>
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
            </SettingsLink>
            {index < (authorizedProjects.length ?? 0) - 1 && <Divider />}
          </Fragment>
        ))
      ) : (
        <Text>Geen bouwprojecten gevonden.</Text>
      )}
    </SettingsSection>
  )
}
