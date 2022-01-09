import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {BellInactive} from '../../assets/icons'
import {Row} from '../../components/ui/layout'
import {color} from '../../tokens'

type MenuItem = {
  name: string
  component: React.ReactNode
}

const iconProps = {fill: color.font.regular}

const menu: MenuItem[] = [
  {
    name: 'notifications',
    component: <BellInactive {...iconProps} />,
  },
  {
    name: 'settings',
    component: <PersonalLogin {...iconProps} />,
  },
]

export const HeaderNavigation = () => (
  <Row gutter="md">
    {menu.map(({name, component}) => (
      <View style={styles.icon} key={name}>
        {component}
      </View>
    ))}
  </Row>
)

const styles = StyleSheet.create({
  icon: {
    width: 24,
    aspectRatio: 1,
    marginTop: 2,
    fill: 'hotpink',
  },
})
