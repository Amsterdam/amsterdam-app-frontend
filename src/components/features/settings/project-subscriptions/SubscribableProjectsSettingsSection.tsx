import React, {Fragment, useContext, useState} from 'react'
import {getEnvironment} from '../../../../environment'
import {useFetch} from '../../../../hooks'
import {SettingsContext} from '../../../../providers/settings.provider'
import {ProjectTitles} from '../../../../types'
import {accessibleText} from '../../../../utils'
import {Box, Button, Divider, PleaseWait, TextButton} from '../../../ui'
import {Checkbox, Switch} from '../../../ui/forms'
import {Column, Row} from '../../../ui/layout'
import {ProjectTitle} from '../../project'
import {SettingsSection} from '../index'

type Props = {
  subscribableProjectIds: string[]
}

export const SubscribableProjectsSettingsSection = ({
  subscribableProjectIds,
}: Props) => {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const {changeSettings, settings} = useContext(SettingsContext)
  const notifications = settings?.notifications

  const {data: projectTitles, isLoading} = useFetch<ProjectTitles[]>({
    url: getEnvironment().apiUrl + '/projects',
    options: {
      params: {
        fields: 'identifier,subtitle,title',
      },
    },
  })

  const cancelEditing = () => {
    setSelectedProjects([])
    setIsEditing(!isEditing)
  }

  const deleteProjects = () => {
    const projects = notifications?.projects ?? {}
    selectedProjects.map((id: string) => delete projects[id])

    notifications &&
      changeSettings('notifications', {
        ...notifications,
        projects,
      })

    setIsEditing(!isEditing)
  }

  const toggleProjectSelection = (projectId: string) =>
    setSelectedProjects(
      selectedProjects.includes(projectId)
        ? selectedProjects.filter(id => id !== projectId)
        : [...selectedProjects, projectId],
    )

  const toggleProjectSubscription = (
    projectId: string,
    subscribed: boolean,
  ) => {
    notifications &&
      changeSettings('notifications', {
        ...notifications,
        projects: {
          ...notifications?.projects,
          [projectId]: subscribed,
        },
      })
  }

  return (
    <>
      {isLoading ? (
        <PleaseWait />
      ) : (
        <Column gutter="md">
          <SettingsSection title="Bouwprojecten">
            {subscribableProjectIds.map((projectId, index) => {
              const project = projectTitles?.find(
                p => p.identifier === projectId,
              )
              const subscribed = notifications?.projects?.[projectId] ?? false

              return (
                project && (
                  <Fragment key={project.identifier}>
                    <Box insetVertical="sm">
                      {isEditing ? (
                        <Checkbox
                          accessibilityLabel={accessibleText(
                            project.title,
                            project.subtitle ?? undefined,
                          )}
                          label={
                            <ProjectTitle
                              title={project.title}
                              subtitle={project.subtitle ?? undefined}
                            />
                          }
                          onValueChange={() =>
                            toggleProjectSelection(project.identifier)
                          }
                          value={selectedProjects.includes(project.identifier)}
                        />
                      ) : (
                        <Switch
                          accessibilityLabel={accessibleText(
                            project.title,
                            project.subtitle ?? undefined,
                          )}
                          label={
                            <ProjectTitle
                              title={project.title}
                              subtitle={project.subtitle ?? undefined}
                            />
                          }
                          onValueChange={() =>
                            toggleProjectSubscription(
                              project.identifier,
                              !subscribed,
                            )
                          }
                          value={subscribed}
                        />
                      )}
                    </Box>
                    {index < (subscribableProjectIds.length ?? 0) - 1 && (
                      <Divider />
                    )}
                  </Fragment>
                )
              )
            })}
          </SettingsSection>
          {isEditing ? (
            <>
              <Box insetHorizontal="md">
                <Button
                  onPress={deleteProjects}
                  text="Verwijder bouwprojecten"
                  variant="secondary"
                />
              </Box>
              <Box>
                <Row align="center">
                  <TextButton
                    emphasis
                    icon="cancel"
                    onPress={cancelEditing}
                    text="Annuleer"
                  />
                </Row>
              </Box>
            </>
          ) : (
            <Row align="center">
              <TextButton
                emphasis
                onPress={() => setIsEditing(!isEditing)}
                text="Bouwprojecten verwijderen"
              />
            </Row>
          )}
        </Column>
      )}
    </>
  )
}
