import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Attention, Box, Divider, SingleSelectable, Text} from '@/components/ui'
import {PleaseWait} from '@/components/ui/feedback'
import {useConstructionWorkEditor} from '@/modules/construction-work-editor/hooks'
import {ProjectTitle} from '@/modules/construction-work/components/project'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {module as userModule} from '@/modules/user'
import {LinkToUserSection, UserSection} from '@/modules/user/components'
import {accessibleText} from '@/utils'

export const AuthorizedProjectsUserSection = () => {
  const {authorizedProjects, isLoadingProjects, projectManager} =
    useConstructionWorkEditor()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

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
                navigation.navigate(ConstructionWorkRouteName.project, {
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
