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
import {formatSentence} from '../../utils'
import {WasteGuideDetails} from './WasteGuideByAddress'

type Props = {
  address: Address
  properties: WasteGuideDetails
}

export const WasteGuideForBulkyWaste = ({address, properties}: Props) => {
  const {postcode, huisnummer, bag_huisletter, bag_toevoeging} = address
  const {collectionDays, remark, whenToPutOut} = properties

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Grof afval" />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: collectionDays.includes(' en ')
                ? 'Ophaaldagen'
                : 'Ophaaldag',
              value: collectionDays && formatSentence(collectionDays),
            },
            {
              label: 'Buiten zetten',
              value: whenToPutOut,
            },
            {
              label: 'Opmerking',
              value: remark && formatSentence(remark),
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
