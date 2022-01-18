import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {BellInactive} from '../../assets/icons'
import {Row} from '../../components/ui/layout'
import {color} from '../../tokens'
import {routes} from './routes'
import {StackParams, TabParams} from './types'

type MenuItem = {
  icon: React.ReactNode
  label: string
  name: string
  route: keyof StackParams
}

const iconProps = {
  fill: color.font.regular,
}

const menu: MenuItem[] = [
  {
    icon: <BellInactive {...iconProps} />,
    label: 'Berichten',
    name: 'notifications',
    route: routes.notificationOverview.name,
  },
  {
    icon: <PersonalLogin {...iconProps} />,
    label: 'Instellingen',
    name: 'settings',
    route: routes.settings.name,
  },
]

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams & TabParams, 'Home'>>()

  return (
    <Row gutter="md">
      {menu.map(({icon, label, name, route}) => (
        <TouchableOpacity
          accessibilityLabel={label}
          accessibilityRole="button"
          key={name}
          onPress={() => navigation.navigate(route)}
          style={styles.icon}>
          {icon}
        </TouchableOpacity>
      ))}
    </Row>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    aspectRatio: 1,
  },
})
