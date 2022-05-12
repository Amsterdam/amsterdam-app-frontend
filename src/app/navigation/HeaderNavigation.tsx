import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import simplur from 'simplur'
import {BellInactive, Settings} from '../../assets/icons'
import {useNotifications} from '../../components/features/notifications'
import {IconButton} from '../../components/ui'
import {Row} from '../../components/ui/layout'
import {module as settingsModule} from '../../modules/supportive/settings'
import {color} from '../../tokens'
import {accessibleText} from '../../utils'
import {RootStackParamList} from './RootStackNavigator'
import {routes} from './routes'

const iconProps = {
  fill: color.font.regular,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  const {richNotifications} = useNotifications()
  const numberOfUnreadNotifications = richNotifications.filter(
    n => !n.isRead,
  ).length
  return (
    <Row gutter="md">
      <IconButton
        badgeValue={numberOfUnreadNotifications}
        icon={<BellInactive {...iconProps} />}
        label={accessibleText(
          'Berichten',
          simplur`${[
            numberOfUnreadNotifications,
            (quantity: number) => quantity || 'geen',
          ]} nieuw[|e] bericht[|en]`,
        )}
        onPress={() => navigation.navigate(routes.notificationOverview.name)}
      />
      <IconButton
        icon={<Settings {...iconProps} />}
        label="Instellingen"
        onPress={() => navigation.navigate(settingsModule.name)}
      />
    </Row>
  )
}
