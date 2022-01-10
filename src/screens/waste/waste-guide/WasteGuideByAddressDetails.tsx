import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {MenuStackParams} from '../../../app/navigation'
import {menuRoutes} from '../../../app/navigation/routes'
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
import {WasteGuideDetails} from './types'

type Props = {
  details: WasteGuideDetails
  footerLink?: {
    text: string
    onPress: () => void
  }
}

export const WasteGuideByAddressDetails = ({details, footerLink}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParams, 'WasteGuide'>>()

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
                  navigation.navigate(menuRoutes.webView.name, {
                    sliceFromTop: {portrait: 162, landscape: 208},
                    title: 'Afspraak grof afval ophalen',
                    url: appointmentUrl,
                  })
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
