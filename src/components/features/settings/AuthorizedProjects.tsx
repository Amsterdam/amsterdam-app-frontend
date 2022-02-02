import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {color} from '../../../tokens'
import {Text} from '../../ui'
import {Row} from '../../ui/layout'
import {SettingsSection} from './'

export const AuthorizedProjects = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

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
