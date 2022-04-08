import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {BellInactive, Settings} from '../../assets/icons'
import {IconButton} from '../../components/ui'
import {Row} from '../../components/ui/layout'
import {color} from '../../tokens'
import {routes} from './routes'
import {StackParams, TabParams} from './types'

const iconProps = {
  fill: color.font.regular,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()
  const unreadNotifications: number = 9 // TODO Fetch from state

  return (
    <Row gutter="md">
      <IconButton
        badgeValue={unreadNotifications}
        icon={<BellInactive {...iconProps} />}
        label="Berichten"
        onPress={() => navigation.navigate(routes.notificationOverview.name)}
      />
      <IconButton
        icon={<Settings {...iconProps} />}
        label="Instellingen"
        onPress={() => navigation.navigate(routes.settings.name)}
      />
    </Row>
  )
}
