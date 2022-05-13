import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Settings} from '../../assets/icons'
import {IconButton} from '../../components/ui'
import {module as settingsModule} from '../../modules/settings'
import {color} from '../../tokens'
import {RootStackParamList} from './RootStackNavigator'

const iconProps = {
  fill: color.touchable.primary,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <IconButton
      icon={<Settings {...iconProps} />}
      label="Instellingen"
      onPress={() => navigation.navigate(settingsModule.name)}
    />
  )
}
