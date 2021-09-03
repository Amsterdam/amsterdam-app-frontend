import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Gutter,
  Title,
} from '../../components/ui'
import {size} from '../../tokens'
import {WasteGuideDetails} from './types'

type Props = {
  details: WasteGuideDetails
}

export const WasteGuideByAddressDetails = ({details}: Props) => {
  const {
    appointmentUrl,
    collectionDays,
    howToOffer,
    remark,
    title,
    whenToPutOut,
  } = details

  return (
    <Card>
      <CardHeader>
        <Title level={4} text={title} />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: 'Hoe',
              value: howToOffer,
            },
            {
              label: collectionDays?.includes(' en ')
                ? 'Ophaaldagen'
                : 'Ophaaldag',
              value: collectionDays,
            },
            {
              label: 'Buiten zetten',
              value: whenToPutOut,
            },
            {
              label: 'Opmerking',
              value: remark,
            },
          ]}
        />
        {appointmentUrl && (
          <View style={styles.alignLeft}>
            <Gutter height={size.spacing.md} />
            <Button
              onPress={() => Linking.openURL(appointmentUrl)}
              text="Maak een afspraak"
            />
          </View>
        )}
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  alignLeft: {
    alignItems: 'flex-start',
  },
})
