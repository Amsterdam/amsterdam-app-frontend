import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {RootStackParamList, routes} from '../../../App'
import {Project} from '../../assets/icons'
import {Box, TileButton, TileButtonProps} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {getEnvironment} from '../../environment'
import {AddressContext} from '../../providers'
import {color} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

type MenuItem = Pick<TileButtonProps, 'icon' | 'label' | 'onPress'>

export const MenuScreen = ({navigation}: Props) => {
  const addressContext = useContext(AddressContext)
  const iconProps = {fill: color.font.primary}

  const baseMenuItems: MenuItem[] = [
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
      onPress: () =>
        navigation.navigate(routes.webView.name, {
          title: 'Melden',
          url: `${getEnvironment().signalsBaseUrl}/incident/beschrijf`,
          urlParams: {
            lat: addressContext.address?.centroid[1],
            lng: addressContext.address?.centroid[0],
          },
        }),
    },
    {
      icon: <Chatting {...iconProps} />,
      label: 'Contact',
      onPress: () => navigation.navigate(routes.contact.name),
    },
  ]

  const menuItems = baseMenuItems.map(tile => ({
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
