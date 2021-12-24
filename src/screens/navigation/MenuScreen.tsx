import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Data from '@amsterdam/asc-assets/static/icons/Data.svg'
import Lamp from '@amsterdam/asc-assets/static/icons/Lamp.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatGrid} from 'react-native-super-grid'
import {
  menuScreenOptions,
  MenuStackParamList,
  reportScreenOptions,
  RootStackParamList,
  tabNavOptions,
} from '../../App/navigation'
import {Project} from '../../assets/icons'
import {TileButton, TileButtonProps} from '../../components/ui'
import {color, size} from '../../tokens'

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
      label: 'Bouwprojecten',
      onPress: () =>
        navigation.navigate(menuScreenOptions.projectOverview.name),
    },
    {
      icon: <Alert {...iconProps} />,
      label: 'Melden',
      onPress: () =>
        navigation.navigate(tabNavOptions.report.name, {
          screen: reportScreenOptions.reportIssue.name,
        }),
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
    <FlatGrid
      data={menuItems}
      itemDimension={size.spacing.md * 11}
      keyExtractor={item => item.label}
      renderItem={({item}) => <TileButton {...item} />}
      spacing={size.spacing.sm}
      style={{margin: size.spacing.sm}}
    />
  )
}
