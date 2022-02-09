import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {SettingsLink, SettingsSection} from '../'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {SettingsContext} from '../../../../providers'
import {Text} from '../../../ui'

export const ProjectManagerSettingsSection = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()
  const {settings} = useContext(SettingsContext)
  const isProjectManager = !!settings?.['project-manager']?.id

  // Don’t render if user is not a project manager
  if (!isProjectManager) {
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
