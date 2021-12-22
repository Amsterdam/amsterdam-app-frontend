import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {menuScreenOptions} from '../../App/navigation/screenOptions'
import {MenuStackParamList} from '../../App/navigation/types'
import {BulkyWaste, Container} from '../../assets/icons'
import {Box, TileButton, TileButtonProps} from '../../components/ui'
import {Column} from '../../components/ui/layout'
import {color} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<MenuStackParamList, 'Waste'>
}

export const WasteMenuScreen = ({navigation}: Props) => {
  const iconProps = {fill: color.font.primary}

  const menuItems: TileButtonProps[] = [
    {
      icon: <Location {...iconProps} />,
      label: 'Afvalinformatie op adres',
      onPress: () => navigation.navigate(menuScreenOptions.wasteGuide.name),
    },
    {
      icon: <Container {...iconProps} />,
      label: 'Containers in de buurt',
      onPress: () =>
        navigation.navigate(menuScreenOptions.webView.name, {
          sliceFromTop: {portrait: 50, landscape: 50},
          title: 'Containers in de buurt',
          url: 'https://kaart.amsterdam.nl/afvalcontainers#17/52.36306/4.90720/brt/12491,12492,12493,12494,12495,12496,12497//',
        }),
    },
    {
      icon: <LocationFields {...iconProps} />,
      label: 'Afvalpunten',
      onPress: () =>
        navigation.navigate(menuScreenOptions.webView.name, {
          sliceFromTop: {portrait: 50, landscape: 50},
          title: 'Afvalpunten in de buurt',
          url: 'https://kaart.amsterdam.nl/#52.2744/4.7151/52.4355/5.0667/brt/9776/244/',
        }),
    },
    {
      icon: <BulkyWaste {...iconProps} />,
      label: 'Waar kan grof afval naar toe',
      onPress: () =>
        navigation.navigate(menuScreenOptions.whereToPutBulkyWaste.name),
    },
  ]

  return (
    <Box>
      <Column gutter="sm">
        {menuItems.map(menuItem => (
          <TileButton {...menuItem} key={menuItem.label} />
        ))}
      </Column>
    </Box>
  )
}
