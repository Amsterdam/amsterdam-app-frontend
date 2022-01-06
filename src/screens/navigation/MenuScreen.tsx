import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Data from '@amsterdam/asc-assets/static/icons/Data.svg'
import Energy from '@amsterdam/asc-assets/static/icons/Energy.svg'
import Lamp from '@amsterdam/asc-assets/static/icons/Lamp.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatGrid} from 'react-native-super-grid'
import {
  actionRoutes,
  menuRoutes,
  MenuStackParams,
  TabParams,
  tabRoutes,
} from '../../App/navigation'
import {Project} from '../../assets/icons'
import {TileButton, TileButtonProps} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {color, size} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<MenuStackParams & TabParams, 'Menu'>
}

export const MenuScreen = ({navigation}: Props) => {
  const iconProps = {fill: color.font.primary}

  const baseMenuItems: TileButtonProps[] = [
    {
      icon: <TrashBin {...iconProps} />,
      label: 'Afval',
      onPress: () => navigation.navigate(menuRoutes.wasteMenu.name),
    },
    {
      icon: <Project />,
      label: 'Bouwprojecten',
      onPress: () => navigation.navigate(menuRoutes.projectOverview.name),
    },
    {
      icon: <Alert {...iconProps} />,
      label: 'Melden',
      onPress: () =>
        navigation.navigate(tabRoutes.action.name, {
          screen: actionRoutes.reportIssue.name,
        }),
    },
    {
      icon: <Chatting {...iconProps} />,
      label: 'Contact',
      onPress: () => navigation.navigate(menuRoutes.contact.name),
    },
    {
      icon: <Data {...iconProps} />,
      label: 'Instellingen',
      onPress: () => navigation.navigate(menuRoutes.settings.name),
    },
    {
      icon: <Lamp {...iconProps} />,
      label: 'Berichten',
      onPress: () => navigation.navigate(menuRoutes.notificationOverview.name),
    },
  ]

  if (getEnvironment().name !== 'production') {
    baseMenuItems.push({
      icon: <Energy {...iconProps} />,
      label: 'Admin',
      onPress: () => navigation.navigate(menuRoutes.admin.name),
    })
  }

  const menuItems: TileButtonProps[] = baseMenuItems.map(tile => ({
    ...tile,
    iconSize: 48,
    square: true,
    width: '50%',
  }))

  return (
    <FlatGrid
      data={menuItems}
      itemDimension={size.spacing.md * 10}
      keyExtractor={item => item.label}
      renderItem={({item}) => <TileButton {...item} />}
      spacing={size.spacing.sm}
      style={{margin: size.spacing.sm}}
    />
  )
}
