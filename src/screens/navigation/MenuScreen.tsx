import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Data from '@amsterdam/asc-assets/static/icons/Data.svg'
import Lamp from '@amsterdam/asc-assets/static/icons/Lamp.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {
  menuScreenOptions,
  tabNavOptions,
} from '../../App/navigation/screenOptions'
import {
  MenuStackParamList,
  RootStackParamList,
} from '../../App/navigation/types'
import {Project} from '../../assets/icons'
import {Box, TileButton, TileButtonProps} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {color} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<
    MenuStackParamList & RootStackParamList,
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
      onPress: () =>
        navigation.navigate(menuScreenOptions.projectOverview.name),
    },
    {
      icon: <Alert {...iconProps} />,
      label: 'Melden',
      onPress: () => navigation.navigate(tabNavOptions.report.name),
    },
    {
      icon: <Chatting {...iconProps} />,
      label: 'Contact',
      onPress: () => navigation.navigate(menuScreenOptions.contact.name),
    },
    {
      icon: <Data {...iconProps} />,
      label: 'Instellingen',
      onPress: () => navigation.navigate(menuScreenOptions.settings.name),
    },
    {
      icon: <Lamp {...iconProps} />,
      label: 'Berichten',
      onPress: () =>
        navigation.navigate(menuScreenOptions.notificationOverview.name),
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
          <Row gutter="sm">
            <TileButton {...menuItems[4]} />
            <TileButton {...menuItems[5]} />
          </Row>
        </Column>
      </Box>
    </ScrollView>
  )
}
