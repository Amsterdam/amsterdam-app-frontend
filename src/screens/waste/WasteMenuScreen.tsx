import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../../App'
import {BulkyWaste, Container} from '../../assets/icons'
import {Box, TileButton} from '../../components/ui'
import {Column} from '../../components/ui/layout'
import {color} from '../../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const WasteMenuScreen = ({navigation}: Props) => {
  const iconProps = {fill: color.font.primary}

  return (
    <Box>
      <Column gutter="sm">
        <TileButton
          icon={<Location {...iconProps} />}
          label="Afvalinformatie op adres"
          onPress={() => navigation.navigate(routes.wasteGuide.name)}
        />
        <TileButton
          icon={<Container {...iconProps} />}
          label="Containers in de buurt"
          onPress={() =>
            navigation.navigate(routes.webView.name, {
              sliceFromTop: {portrait: 50, landscape: 50},
              title: 'Containers in de buurt',
              url: 'https://kaart.amsterdam.nl/afvalcontainers#17/52.36306/4.90720/brt/12491,12492,12493,12494,12495,12496,12497//',
            })
          }
        />
        <TileButton
          icon={<LocationFields {...iconProps} />}
          label="Afvalpunten"
          onPress={() =>
            navigation.navigate(routes.webView.name, {
              sliceFromTop: {portrait: 50, landscape: 50},
              title: 'Afvalpunten in de buurt',
              url: 'https://kaart.amsterdam.nl/#52.2744/4.7151/52.4355/5.0667/brt/9776/244/',
            })
          }
        />
        <TileButton
          icon={<BulkyWaste {...iconProps} />}
          label="Waar kan grof afval naar toe"
          onPress={() => navigation.navigate(routes.whereToPutBulkyWaste.name)}
        />
      </Column>
    </Box>
  )
}
