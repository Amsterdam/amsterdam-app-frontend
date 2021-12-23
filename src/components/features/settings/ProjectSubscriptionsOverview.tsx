import React, {Fragment, useContext, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {SettingsContext} from '../../../providers/settings.provider'
import {size} from '../../../tokens'
import {ProjectOverviewItem} from '../../../types'
import {accessibleText} from '../../../utils'
import {Box, Button, Divider, PleaseWait, Text, TextButton} from '../../ui'
import {Checkbox, Switch} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {ProjectTitle} from '../project'

type Props = {
  subscribableProjectIds: string[]
}

export const ProjectSubscriptionsOverview = ({
  subscribableProjectIds,
}: Props) => {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const {changeSettings, settings} = useContext(SettingsContext)
  const notifications = settings?.notifications

  const {data: allProjects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
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
          <Column gutter="sm">
            <View style={styles.customInset}>
              <Text intro accessibilityRole="header">
                Bouwprojecten
              </Text>
            </View>
            <Box background="white" borderVertical insetHorizontal="md">
              {subscribableProjectIds.map((projectId, index) => {
                const project = allProjects?.find(
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
                              project.subtitle,
                            )}
                            label={
                              <ProjectTitle
                                title={project.title}
                                subtitle={project.subtitle}
                              />
                            }
                            onValueChange={() =>
                              toggleProjectSelection(project.identifier)
                            }
                            value={selectedProjects.includes(
                              project.identifier,
                            )}
                          />
                        ) : (
                          <Switch
                            accessibilityLabel={accessibleText(
                              project.title,
                              project.subtitle,
                            )}
                            label={
                              <ProjectTitle
                                title={project.title}
                                subtitle={project.subtitle}
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
            </Box>
          </Column>
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

const styles = StyleSheet.create({
  customInset: {
    paddingHorizontal: size.spacing.md,
  },
})
