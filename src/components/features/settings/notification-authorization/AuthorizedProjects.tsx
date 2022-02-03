import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {SettingsContext} from '../../../../providers'
import {color} from '../../../../tokens'
import {Text} from '../../../ui'
import {Row} from '../../../ui/layout'
import {SettingsSection} from '../index'

export const AuthorizedProjects = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()
  const {settings} = useContext(SettingsContext)

  // Don’t render if user is not a project manager
  if (!settings?.['project-manager']) {
    return null
  }

  return (
    <SettingsSection title="Omgevingsmanager">
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.authorizedProjects.name)}>
        <Row align="between" gutter="md" valign="center">
          <Text large>Uw bouwprojecten</Text>
          <View style={styles.icon}>
            <ChevronRight fill={color.font.regular} />
          </View>
        </Row>
      </TouchableOpacity>
    </SettingsSection>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    aspectRatio: 1,
  },
})
