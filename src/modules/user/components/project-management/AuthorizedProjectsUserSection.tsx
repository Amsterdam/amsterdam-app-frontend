import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment} from 'react'
import {LinkToUserSection, UserSection} from '..'
import {RootStackParamList} from '../../../../app/navigation'
import {
  Attention,
  Box,
  Divider,
  PleaseWait,
  SingleSelectable,
  Text,
} from '../../../../components/ui'
import {accessibleText} from '../../../../utils'
import {ProjectTitle} from '../../../projects/components/project'
import {useProjectManagerFetcher} from '../../../projects/components/project-manager'
import {ProjectsRouteName} from '../../../projects/routes'

export const AuthorizedProjectsUserSection = () => {
  const {authorizedProjects, isLoadingProjects, projectManager} =
    useProjectManagerFetcher()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'UserModule'>>()

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
    <UserSection title="Je bouwprojecten">
      {authorizedProjects.length ? (
        authorizedProjects.map((project, index) => (
          <Fragment key={project.identifier}>
            <LinkToUserSection
              onPress={() =>
                navigation.navigate('ConstructionWorkModule', {
                  screen: ProjectsRouteName.projectDetail,
                  params: {
                    id: project.identifier,
                  },
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
            </LinkToUserSection>
            {index < (authorizedProjects.length ?? 0) - 1 && <Divider />}
          </Fragment>
        ))
      ) : (
        <Text>Geen bouwprojecten gevonden.</Text>
      )}
    </UserSection>
  )
}
