import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {BellInactive, Settings} from '../../assets/icons'
import {Row} from '../../components/ui/layout'
import {color, size} from '../../tokens'
import {allInsets} from '../../utils'
import {routes} from './routes'
import {StackParams, TabParams} from './types'

type MenuItem = {
  icon: ReactNode
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
    icon: <Settings {...iconProps} />,
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
          hitSlop={allInsets(size.spacing.sm)}
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
