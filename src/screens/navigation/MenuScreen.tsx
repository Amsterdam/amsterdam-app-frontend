import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../../App'
import {Project} from '../../assets/icons'
import {Box, TileButton, TileButtonProps} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {color} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const MenuScreen = ({navigation}: Props) => {
  const iconProps = {fill: color.font.primary}

  const baseMenuItems: TileButtonProps[] = [
    {
      icon: <TrashBin {...iconProps} />,
      label: 'Afval',
      onPress: () => navigation.navigate(routes.wasteMenu.name),
    },
    {
      icon: <Project />,
      label: 'Werkzaamheden',
      onPress: () => navigation.navigate(routes.projectOverview.name),
    },
    {
      icon: <Alert {...iconProps} />,
      label: 'Melden',
      onPress: () => navigation.navigate(routes.reportIssue.name),
    },
    {
      icon: <Chatting {...iconProps} />,
      label: 'Contact',
      onPress: () => navigation.navigate(routes.contact.name),
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
