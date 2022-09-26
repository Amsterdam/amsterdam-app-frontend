import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {DescriptionList} from '@/components/ui'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
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

  const {appointmentUrl, collectionDays, howToOffer, remark, whenToPutOut} =
    details

  return (
    <Column gutter="sm">
      <Column gutter="md">
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
          <Button
            accessibilityRole="link"
            label="Haal mijn grof afval op"
            onPress={() =>
              navigation.navigate(WasteGuideRouteName.bulkyWasteAppointment, {
                appointmentUrl,
              })
            }
          />
        )}
      </Column>
      {!!footerLink && (
        <NavigationButton
          label={footerLink.text}
          onPress={footerLink.onPress}
        />
      )}
    </Column>
  )
}
