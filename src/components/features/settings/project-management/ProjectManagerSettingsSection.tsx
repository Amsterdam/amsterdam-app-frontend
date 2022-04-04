import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {SettingsLink, SettingsSection} from '../'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {Text} from '../../../ui'
import {selectProjectManager} from '../../projectManager'

export const ProjectManagerSettingsSection = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  if (!projectManagerId) {
    return null
  }

  return (
    <SettingsSection title="Omgevingsmanager">
      <SettingsLink
        onPress={() => navigation.navigate(routes.authorizedProjects.name)}>
        <Text large>Je bouwprojecten</Text>
      </SettingsLink>
    </SettingsSection>
  )
}
