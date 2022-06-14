import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {BulkyWaste, Container} from '../../../assets/icons'
import {TileButton, TileButtonProps} from '../../../components/ui'
import {DeviceContext} from '../../../providers'
import {color, size} from '../../../tokens'
import {WasteGuideRouteName, WasteGuideStackParams} from '../routes'

type Props = {
  navigation: StackNavigationProp<
    WasteGuideStackParams,
    WasteGuideRouteName.wasteMenu
  >
}

export const WasteMenuScreen = ({navigation}: Props) => {
  const {fontScale, isPortrait, width} = useContext(DeviceContext)
  const iconProps = {fill: color.font.primary}

  const menuItems: TileButtonProps[] = [
    {
      icon: <Location {...iconProps} />,
      label: 'Afvalinformatie op adres',
      onPress: () => navigation.navigate(WasteGuideRouteName.wasteGuide),
    },
    {
      icon: <Container {...iconProps} />,
      label: 'Containers in de buurt',
      onPress: () =>
        navigation.navigate(WasteGuideRouteName.wasteGuideContainers),
    },
    {
      icon: <LocationFields {...iconProps} />,
      label: 'Afvalpunten',
      onPress: () =>
        navigation.navigate(WasteGuideRouteName.wasteGuideCollectionPoints),
    },
    {
      icon: <BulkyWaste {...iconProps} />,
      label: 'Waar kan grof afval naar toe',
      onPress: () =>
        navigation.navigate(WasteGuideRouteName.whereToPutBulkyWaste),
    },
  ]

  const itemDimension = isPortrait
    ? width
    : 24 * size.spacing.md * Math.max(fontScale, 1)

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
