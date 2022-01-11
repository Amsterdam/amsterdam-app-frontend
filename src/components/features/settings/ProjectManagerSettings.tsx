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

  const [allProjects, setAllProjects] = useState<ProjectTitles[] | undefined>()

  // Retrieve all projects from backend as we need to display their titles
  const apiProjects = useFetch<ProjectTitles[]>({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        fields: 'identifier,subtitle,title',
      },
    },
  })

  useEffect(() => {
    apiProjects.data && setAllProjects(apiProjects.data)
  }, [apiProjects.data])

  const authorisedProjects = allProjects?.filter(project =>
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
