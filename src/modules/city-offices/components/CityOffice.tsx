import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {
  Attention,
  PleaseWait,
  SingleSelectable,
  Text,
  Title,
} from '../../../components/ui'
import {Column, Gutter} from '../../../components/ui/layout'
import {Image} from '../../../components/ui/media'
import {useEnvironment} from '../../../store'
import {ImageSources} from '../../../types'
import {accessibleText, mapImageSources} from '../../../utils'
import {CityOfficesRouteName, CityOfficesStackParams} from '../routes'
import {useGetCityOfficeQuery} from '../services'
import {Button} from '@/components/ui/buttons'

type Props = {
  id: string
}

export const CityOffice = ({id}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        CityOfficesStackParams,
        CityOfficesRouteName.cityOffices
      >
    >()

  const {data: cityOffice, isLoading: isCityOfficeLoading} =
    useGetCityOfficeQuery(id)

  const environment = useEnvironment()

  if (isCityOfficeLoading) {
    return <PleaseWait />
  }

  if (!cityOffice) {
    return (
      <Attention warning>
        <Text intro>Fout</Text>
        <Text>Stadsloket niet gevonden.</Text>
      </Attention>
    )
  }

  // TODO Remove backwards compatibility
  const title = cityOffice.title ?? cityOffice.location ?? ''
  const addressText = cityOffice.address.text ?? cityOffice.address.txt
  const [addressLine1, addressLine2] = addressText.split('\n\n') // TEMP

  const imageSources = cityOffice.images.sources ?? ({} as ImageSources)
  const hasImage = Object.keys(imageSources).length

  return (
    <Column gutter="md">
      {!!hasImage && (
        <Image source={mapImageSources(imageSources, environment)} />
      )}
      <Column gutter="md">
        <View>
          <Title level={2} text={title} />
          <SingleSelectable
            accessibilityLabel={accessibleText(
              'Adres',
              addressLine1,
              addressLine2,
            )}>
            <Text>{addressLine1}</Text>
            <Text>{addressLine2}</Text>
          </SingleSelectable>
        </View>
        <View>
          <Text secondary accessibilityRole="header">
            Openingstijden
          </Text>
          <Text>
            De Stadsloketten zijn maandag, dinsdag, woensdag, donderdag en
            vrijdag van 09.00 tot 17.00 uur open.
          </Text>
        </View>
        <View>
          <Title level={4} text="Bezoek op afspraak" />
          <Text>
            U heeft een afspraak nodig om langs te komen bij een Stadsloket.
          </Text>
        </View>
        <Column halign="start">
          <Button
            label="Maak een afspraak"
            onPress={() =>
              navigation.navigate(CityOfficesRouteName.makeAppointment)
            }
          />
        </Column>
      </Column>
      <Gutter height="lg" />
    </Column>
  )
}
