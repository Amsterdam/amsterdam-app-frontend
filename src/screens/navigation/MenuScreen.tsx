import Alert from '@amsterdam/asc-assets/static/icons/Alert.svg'
import Chatting from '@amsterdam/asc-assets/static/icons/Chatting.svg'
import Energy from '@amsterdam/asc-assets/static/icons/Energy.svg'
import TrashBin from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams, TabParams} from '../../app/navigation'
import {routes, tabs} from '../../app/navigation/routes'
import {Project} from '../../assets/icons'
import {TileButton, TileButtonProps} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {DeviceContext} from '../../providers'
import {color, size} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<StackParams & TabParams, 'Menu'>
}

export const MenuScreen = ({navigation}: Props) => {
  const device = useContext(DeviceContext)
  const iconProps = {fill: color.font.primary}

  const baseMenuItems: TileButtonProps[] = [
    {
      icon: <TrashBin {...iconProps} />,
      label: 'Afval',
      onPress: () => navigation.navigate(routes.wasteMenu.name),
    },
    {
      icon: <Project />,
      label: 'Bouwprojecten',
      onPress: () => navigation.navigate(routes.projects.name),
    },
    {
      icon: <Alert {...iconProps} />,
      label: 'Melden',
      onPress: () =>
        navigation.navigate(tabs.action.name, {
          screen: routes.reportIssue.name,
        }),
    },
    {
      icon: <Chatting {...iconProps} />,
      label: 'Contact',
      onPress: () => navigation.navigate(routes.contact.name),
    },
  ]

  if (getEnvironment().name !== 'production') {
    baseMenuItems.push({
      icon: <Energy {...iconProps} />,
      label: 'Admin',
      onPress: () => navigation.navigate(routes.admin.name),
    })
  }

  const menuItems: TileButtonProps[] = baseMenuItems.map(tile => ({
    ...tile,
    iconSize: 48,
    square: true,
    width: '50%',
  }))

  const itemDimension = device.isPortrait
    ? 8 * size.spacing.md * Math.max(device.fontScale, 1)
    : 12 * size.spacing.md * Math.max(device.fontScale, 1)

  return (
    <FlatGrid
      data={menuItems}
      itemDimension={itemDimension}
      keyExtractor={item => item.label}
      renderItem={({item}) => <TileButton {...item} />}
      spacing={size.spacing.sm}
      style={styles.grid}
    />
  )
}

const styles = StyleSheet.create({
  grid: {
    margin: size.spacing.sm,
  },
})
