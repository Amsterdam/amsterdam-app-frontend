import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment} from 'react'
import {SettingsLink, SettingsSection} from '../'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {ProjectTitle} from '../../../../components/features/project'
import {useProjectManagerFetcher} from '../../../../components/features/project-manager'
import {
  Attention,
  Box,
  Divider,
  PleaseWait,
  SingleSelectable,
  Text,
} from '../../../../components/ui'
import {accessibleText} from '../../../../utils'

export const AuthorizedProjectsSettingsSection = () => {
  const {authorizedProjects, isLoadingProjects, projectManager} =
    useProjectManagerFetcher()
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  if (!projectManager) {
    return (
      <Box insetHorizontal="md">
        <Attention warning>
          <Text>U bent niet gemachtigd om pushberichten te sturen.</Text>
        </Attention>
      </Box>
    )
  }

  if (isLoadingProjects) {
    return <PleaseWait />
  }

  if (!authorizedProjects || !authorizedProjects.length) {
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
