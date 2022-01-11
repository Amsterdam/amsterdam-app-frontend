import React, {Fragment, useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {SettingsContext} from '../../../providers/settings.provider'
import {ProjectTitles} from '../../../types'
import {Box, Card, CardBody, CardHeader, Divider, Text, Title} from '../../ui'
import {Column} from '../../ui/layout'

export const ProjectManagerSettings = () => {
  const {settings} = useContext(SettingsContext)
  const projectManagerSettings = settings && settings['project-manager']

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
      <Card>
        <CardHeader>
          <Title level={4} text="Ingelogd als omgevingsmanager" />
        </CardHeader>
        <CardBody>
          <Column gutter="md">
            <Text>
              Voor de volgende bouwprojecten kunt u pushberichten versturen:
            </Text>
            <View>
              <Divider />
              {authorisedProjects.map(project => (
                <Fragment key={project.identifier}>
                  <Box insetVertical="sm">
                    <Text large>{project.title}</Text>
                  </Box>
                  <Divider />
                </Fragment>
              ))}
            </View>
            <Text small>{projectManagerSettings.id}</Text>
          </Column>
        </CardBody>
      </Card>
    </Box>
  ) : null
}
