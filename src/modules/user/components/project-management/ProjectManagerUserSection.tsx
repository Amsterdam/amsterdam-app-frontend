import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {LinkToUserSection, UserSection} from '..'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {Text} from '../../../../components/ui'
import {selectProjectManager} from '../../../projects/components/project-manager'

export const ProjectManagerUserSection = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  if (!projectManagerId) {
    return null
  }

  return (
    <UserSection title="Omgevingsmanager">
      <LinkToUserSection
        onPress={() => navigation.navigate(routes.authorizedProjects.name)}>
        <Text large>Je bouwprojecten</Text>
      </LinkToUserSection>
    </UserSection>
  )
}
