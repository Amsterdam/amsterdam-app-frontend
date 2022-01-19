import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {CityOffice as CityOfficeType} from '../../../types/city'
import {Button, CardBody, Image, PleaseWait, Text, Title} from '../../ui'
import {Column} from '../../ui/layout'

type Props = {
  id: string
}

export const CityOffice = ({id}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Contact'>>()

  const {data: cityOffice, isLoading: isCityOfficeLoading} =
    useFetch<CityOfficeType>({
      url: getEnvironment().apiUrl + '/city/office',
      options: {
        params: {
          id,
        },
      },
    })

  if (isCityOfficeLoading || !cityOffice) {
    return <PleaseWait />
  }

  const [addressLine1, addressLine2] = cityOffice.address.txt.split('\n\n') // TEMP
  const imageUrl =
    getEnvironment().apiUrl +
    '/image?id=' +
    cityOffice.images.sources?.['460px'].image_id

  return (
    <>
      <Image source={{uri: imageUrl}} />
      <CardBody>
        <Column gutter="md">
          <View>
            <Title level={2} text={cityOffice.location} />
            <Text>{addressLine1}</Text>
            <Text>{addressLine2}</Text>
          </View>
          <View>
            <Title level={4} text="Bezoek op afspraak" />
            <Text>
              U heeft een afspraak nodig om langs te komen bij een Stadsloket.
            </Text>
          </View>
          <Column halign="start">
            <Button
              onPress={() =>
                navigation.navigate(routes.webView.name, {
                  sliceFromTop: {portrait: 162, landscape: 208},
                  title: 'Maak een afspraak',
                  url: 'https://www.amsterdam.nl/contact/afspraak-maken-stadsloket/',
                })
              }
              text="Maak een afspraak"
            />
          </Column>
        </Column>
      </CardBody>
    </>
  )
}
