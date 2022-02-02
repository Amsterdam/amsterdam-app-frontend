import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {color} from '../../../tokens'
import {Text} from '../../ui'
import {BlockList, Row} from '../../ui/layout'

export const AuthorizedProjectsSettings = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  return (
    <BlockList title="Omgevingsmanager">
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.authorizedProjectsList.name)}>
        <Row align="between" gutter="md" valign="center">
          <Text large>Uw bouwprojecten</Text>
          <View style={styles.icon}>
            <ChevronRight fill={color.font.regular} />
          </View>
        </Row>
      </TouchableOpacity>
    </BlockList>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    aspectRatio: 1,
  },
})
