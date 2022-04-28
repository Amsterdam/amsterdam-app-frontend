import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import simplur from 'simplur'
import {BellInactive, DarkMode, LightMode, Settings} from '../../assets/icons'
import {useNotifications} from '../../components/features/notifications'
import {IconButton} from '../../components/ui'
import {Row} from '../../components/ui/layout'
import {lightTheme, ThemeContext} from '../../themes'
import {color} from '../../tokens'
import {accessibleText} from '../../utils'
import {routes} from './routes'
import {StackParams, TabParams} from './types'

const iconProps = {
  fill: color.font.regular,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()
  const {richNotifications} = useNotifications()
  const numberOfUnreadNotifications = richNotifications.filter(
    n => !n.isRead,
  ).length

  const {theme, toggleTheme} = useContext(ThemeContext)
  const currentThemeIcon =
    theme === lightTheme ? (
      <LightMode {...iconProps} />
    ) : (
      <DarkMode {...iconProps} />
    )

  return (
    <Row gutter="md">
      <IconButton
        icon={currentThemeIcon}
        label="Schakel thema"
        onPress={toggleTheme}
      />
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
        onPress={() => navigation.navigate(routes.settings.name)}
      />
    </Row>
  )
}
