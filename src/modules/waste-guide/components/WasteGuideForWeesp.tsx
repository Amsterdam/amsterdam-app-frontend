import React from 'react'
import {Linking} from 'react-native'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {Address} from '@/modules/address'

type Props = {
  address: Address
}

export const WasteGuideForWeesp = ({address}: Props) => {
  const gadUrl =
    'https://inzamelkalender.gad.nl/adres/' +
    [address.postcode, address.huisnummer, address.bag_toevoeging].join(':')

  return (
    <Column gutter="lg">
      <Column gutter="md">
        <Paragraph>
          In Weesp haalt de GAD het afval op. Kijk op hun website hoe dat werkt.
        </Paragraph>
      </Column>
      <Row align="start">
        <Button
          accessibilityRole="link"
          iconName="external-link"
          label="Ga naar GAD.nl"
          onPress={() => {
            void Linking.openURL(gadUrl)
          }}
        />
      </Row>
    </Column>
  )
}
