import React from 'react'
import {Linking, View} from 'react-native'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Gutter,
  Title,
} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {size} from '../../tokens'
import {Address} from '../../types/address'
import {formatDateTimes, formatSentence} from '../../utils'
import {WasteGuideProperties} from './WasteGuideByAddress'

type Props = {
  address: Address
  properties: WasteGuideProperties
}

export const WasteGuideForBulkyWaste = ({address, properties}: Props) => {
  const {postcode, huisnummer, bag_huisletter, bag_toevoeging} = address
  const {ophaaldag, tijd_vanaf, tijd_tot, opmerking} = properties

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Grof afval" />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: ophaaldag.includes(' en ') ? 'Ophaaldagen' : 'Ophaaldag',
              value: ophaaldag && formatSentence(ophaaldag),
            },
            {
              label: 'Buiten zetten',
              value: formatSentence(
                formatDateTimes(
                  ophaaldag,
                  tijd_vanaf,
                  'aanbiedtijden onbekend',
                  'ophaaldagen onbekend',
                  tijd_tot,
                ),
              ),
            },
            {
              label: 'Opmerking',
              value: opmerking && formatSentence(opmerking),
            },
          ]}
        />
        <View style={{alignItems: 'flex-start'}}>
          <Gutter height={size.spacing.md} />
          <Button
            onPress={() =>
              Linking.openURL(
                getEnvironment().bulkyWasteFormUrl +
                  `?GUID=${postcode},${huisnummer},${bag_huisletter},${bag_toevoeging}`,
              )
            }
            text="Maak een afspraak"
          />
        </View>
      </CardBody>
    </Card>
  )
}
