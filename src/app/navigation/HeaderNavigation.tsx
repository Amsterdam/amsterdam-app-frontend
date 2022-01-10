import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {BellInactive} from '../../assets/icons'
import {Row} from '../../components/ui/layout'
import {color} from '../../tokens'
import {homeRoutes} from './routes'
import {HomeStackParams, TabParams} from './types'

type MenuItem = {
  icon: React.ReactNode
  name: string
  route: keyof HomeStackParams
}

const iconProps = {
  fill: color.font.regular,
}

const menu: MenuItem[] = [
  {
    icon: <BellInactive {...iconProps} />,
    name: 'notifications',
    route: homeRoutes.notificationOverview.name,
  },
  {
    icon: <PersonalLogin {...iconProps} />,
    name: 'settings',
    route: homeRoutes.settings.name,
  },
]

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams & TabParams, 'Home'>>()

  return (
    <Row gutter="md">
      {menu.map(({icon, name, route}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route)}
          style={styles.icon}
          key={name}>
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
