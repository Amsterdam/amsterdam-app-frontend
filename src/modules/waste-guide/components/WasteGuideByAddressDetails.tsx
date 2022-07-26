import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Box, DescriptionList, Title} from '@/components/ui'
import {Button, TextButton} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {WasteGuideDetails} from '@/modules/waste-guide/types'

type Props = {
  details: WasteGuideDetails
  footerLink?: {
    text: string
    onPress: () => void
  }
}

export const WasteGuideByAddressDetails = ({details, footerLink}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  const {
    appointmentUrl,
    collectionDays,
    howToOffer,
    remark,
    title,
    whenToPutOut,
  } = details

  return (
    <Box>
      <Title level={2} text={title} />
      <Gutter height="md" />
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
      {!!appointmentUrl && (
        <>
          <Gutter height="md" />
          <Column halign="start">
            <Button
              label="Maak een afspraak"
              onPress={() =>
                navigation.navigate(WasteGuideRouteName.bulkyWasteAppointment, {
                  appointmentUrl,
                })
              }
            />
          </Column>
        </>
      )}
      {!!footerLink && (
        <>
          <Gutter height="md" />
          <Row align="start">
            <TextButton
              direction="forward"
              label={footerLink.text}
              onPress={footerLink.onPress}
            />
          </Row>
        </>
      )}
    </Box>
  )
}
