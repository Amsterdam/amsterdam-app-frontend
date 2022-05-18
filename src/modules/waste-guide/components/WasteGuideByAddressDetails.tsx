import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  TextButton,
  Title,
} from '../../../components/ui'
import {Column, Gutter, Row} from '../../../components/ui/layout'
import {wasteGuideRoutes} from '../routes'
import {WasteGuideDetails} from '../types'

type Props = {
  details: WasteGuideDetails
  footerLink?: {
    text: string
    onPress: () => void
  }
}

export const WasteGuideByAddressDetails = ({details, footerLink}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'WasteGuideModule'>>()

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
          <>
            <Gutter height="md" />
            <Column halign="start">
              <Button
                onPress={() =>
                  navigation.navigate(
                    wasteGuideRoutes.bulkyWasteAppointment.name,
                    {appointmentUrl},
                  )
                }
                text="Maak een afspraak"
              />
            </Column>
          </>
        )}
        {footerLink && (
          <>
            <Gutter height="md" />
            <Row align="start">
              <TextButton
                direction="forward"
                onPress={footerLink.onPress}
                text={footerLink.text}
              />
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  )
}
