import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuScreenOptions} from '../../App/navigation/screenOptions'
import {
  MenuStackParamList,
  ProjectStackParamList,
} from '../../App/navigation/types'
import {Project} from '../../assets/icons'
import {Box, TileButton, TileButtonProps} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {color} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<
    MenuStackParamList & ProjectStackParamList,
    'Menu'
  >
}

export const MenuScreen = ({navigation}: Props) => {
  const iconProps = {fill: color.font.primary}

  const baseMenuItems: TileButtonProps[] = [
    {
      icon: <TrashBin {...iconProps} />,
      label: 'Afval',
      onPress: () => navigation.navigate(menuScreenOptions.wasteMenu.name),
    },
    {
      icon: <Project />,
      label: 'Werkzaamheden',
      onPress: () => navigation.navigate(menuScreenOptions.projectStack.name),
    },
    {
      icon: <Alert {...iconProps} />,
      label: 'Melden',
      onPress: () => navigation.navigate(menuScreenOptions.reportIssue.name),
    },
    {
      icon: <Chatting {...iconProps} />,
      label: 'Contact',
      onPress: () => navigation.navigate(menuScreenOptions.contact.name),
    },
  ]

  const menuItems: TileButtonProps[] = baseMenuItems.map(tile => ({
    ...tile,
    iconSize: 48,
    square: true,
    width: '50%',
  }))

  return (
    <ScrollView>
      <Box>
        <Column gutter="sm">
          <Row gutter="sm">
            <TileButton {...menuItems[0]} />
            <TileButton {...menuItems[1]} />
          </Row>
          <Row gutter="sm">
            <TileButton {...menuItems[2]} />
            <TileButton {...menuItems[3]} />
          </Row>
        </Column>
      </Box>
    </ScrollView>
  )
}
