import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {LinkToUserSection, UserSection} from '..'
import {module as userModule} from '../..'
import {RootStackParamList} from '../../../../app/navigation'
import {Text} from '../../../../components/ui'
import {module as projectsModule} from '../../../projects'
import {selectProjectManager} from '../../../projects/components/project-manager'
import {ProjectsRouteName} from '../../../projects/routes'

export const ProjectManagerUserSection = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof userModule.name>
    >()

  if (!projectManagerId) {
    return null
  }

  return (
    <UserSection title="Omgevingsmanager">
      <LinkToUserSection
        onPress={() =>
          navigation.navigate(
            projectsModule.name,
            ProjectsRouteName.authorizedProjects,
          )
        }>
        <Text large>Je bouwprojecten</Text>
      </LinkToUserSection>
    </UserSection>
  )
}
