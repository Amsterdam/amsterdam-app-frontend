import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode} from 'react'
import {DescriptionList} from '@/components/ui'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
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
  illustration?: ReactNode
}

export const WasteGuideByAddressDetails = ({
  details,
  footerLink,
  illustration,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  const {appointmentUrl, collectionDays, howToOffer, remark, whenToPutOut} =
    details

  return (
    <Column gutter="sm">
      <Column gutter="md">
        {!!illustration && <Figure height={192}>{illustration}</Figure>}
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
