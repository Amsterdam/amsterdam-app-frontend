import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {
  ProjectManagerSettings as ProjectManagerSettingsType,
  ProjectOverviewItem,
} from '../../../types'
import {Box, Card, CardBody, CardHeader, Divider, Text, Title} from '../../ui'
import {Column} from '../../ui/layout'

export const ProjectManagerSettings = () => {
  const asyncStorage = useAsyncStorage()

  const [allProjects, setAllProjects] = useState<
    ProjectOverviewItem[] | undefined
  >()
  const [projectManagerSettings, setProjectManagerSettings] = useState<
    ProjectManagerSettingsType | undefined
  >()

  // Retrieve all projects from backend as we need to display their titles
  const apiProjects = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  useEffect(() => {
    apiProjects.data && setAllProjects(apiProjects.data)
  }, [apiProjects.data])

  // Retrieve project manager settings from device
  useEffect(() => {
    const retrieveProjectManagerSettings = async () => {
      const currentProjectManagerSettings:
        | ProjectManagerSettingsType
        | undefined = await asyncStorage.getData('project-manager')
      setProjectManagerSettings(currentProjectManagerSettings)
    }

    retrieveProjectManagerSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              Voor de volgende werkzaamheden kunt u pushberichten versturen:
            </Text>
            <View>
              <Divider />
              {authorisedProjects.map(project => (
                <>
                  <Box insetVertical="sm">
                    <Text large>{project.title}</Text>
                  </Box>
                  <Divider />
                </>
              ))}
            </View>
            <Text small>{projectManagerSettings.id}</Text>
          </Column>
        </CardBody>
      </Card>
    </Box>
  ) : null
}
