import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParamList} from '../../../app/navigation'
import {BulkyWaste, Container} from '../../../assets/icons'
import {TileButton, TileButtonProps} from '../../../components/ui'
import {DeviceContext} from '../../../providers'
import {color, size} from '../../../tokens'
import {wasteGuideRoutes} from '../routes'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WasteGuideModule'>
}

export const WasteMenuScreen = ({navigation}: Props) => {
  const device = useContext(DeviceContext)
  const iconProps = {fill: color.font.primary}

  const menuItems: TileButtonProps[] = [
    {
      icon: <Location {...iconProps} />,
      label: 'Afvalinformatie op adres',
      onPress: () => navigation.navigate(wasteGuideRoutes.wasteGuide.name),
    },
    {
      icon: <Container {...iconProps} />,
      label: 'Containers in de buurt',
      onPress: () =>
        navigation.navigate(wasteGuideRoutes.wasteGuideContainers.name),
    },
    {
      icon: <LocationFields {...iconProps} />,
      label: 'Afvalpunten',
      onPress: () =>
        navigation.navigate(wasteGuideRoutes.wasteGuideCollectionPoints.name),
    },
    {
      icon: <BulkyWaste {...iconProps} />,
      label: 'Waar kan grof afval naar toe',
      onPress: () =>
        navigation.navigate(wasteGuideRoutes.whereToPutBulkyWaste.name),
    },
  ]

  const itemDimension = device.isPortrait
    ? device.width
    : 24 * size.spacing.md * Math.max(device.fontScale, 1)

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
