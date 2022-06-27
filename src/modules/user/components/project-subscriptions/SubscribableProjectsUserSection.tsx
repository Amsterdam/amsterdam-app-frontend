import React, {Fragment, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  deleteProjects,
  selectNotificationSettings,
  toggleProject,
  toggleProjectsEnabled,
} from '../../../../components/features/notifications'
import {
  Box,
  Button,
  Divider,
  PleaseWait,
  TextButton,
} from '../../../../components/ui'
import {Checkbox, Switch} from '../../../../components/ui/forms'
import {Column, Row} from '../../../../components/ui/layout'
import {accessibleText} from '../../../../utils'
import {ProjectTitle} from '../../../construction-work/components/project'
import {useGetProjectsQuery} from '../../../construction-work/construction-work.service'
import {UserSection} from '../index'

type Props = {
  subscribableProjectIds: string[]
}

export const SubscribableProjectsUserSection = ({
  subscribableProjectIds,
}: Props) => {
  const dispatch = useDispatch()
  const notificationSettings = useSelector(selectNotificationSettings)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const {data: projectTitles, isLoading: isProjectsLoading} =
    useGetProjectsQuery({
      fields: ['identifier', 'subtitle', 'title'],
    })

  const cancelEditing = () => {
    setSelectedProjects([])
    setIsEditing(!isEditing)
  }

  const deleteProjectsFromStore = () => {
    dispatch(deleteProjects(selectedProjects))
    setIsEditing(!isEditing)
  }

  const toggleProjectSelection = (projectId: string) =>
    setSelectedProjects(
      selectedProjects.includes(projectId)
        ? selectedProjects.filter(id => id !== projectId)
        : [...selectedProjects, projectId],
    )

  const toggleProjectSubscription = (projectId: string) => {
    if (!notificationSettings.projectsEnabled) {
      dispatch(toggleProjectsEnabled())
    }
    dispatch(toggleProject(projectId))
  }

  if (isProjectsLoading) {
    return <PleaseWait />
  }

  return (
    <Column gutter="md">
      <UserSection title="Bouwprojecten">
        {subscribableProjectIds.map((projectId, index) => {
          const project = projectTitles?.find(p => p.identifier === projectId)
          const subscribed = notificationSettings.projects[projectId]

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
                        toggleProjectSubscription(project.identifier)
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
      </UserSection>
      {isEditing ? (
        <>
          <Box insetHorizontal="md">
            <Button
              onPress={deleteProjectsFromStore}
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
  )
}
