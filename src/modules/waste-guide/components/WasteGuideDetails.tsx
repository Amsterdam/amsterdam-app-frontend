import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {ReactNode, useContext} from 'react'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {DescriptionList, Paragraph} from '@/components/ui/text'
import {
  WasteGuideRouteName,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {WasteGuideDetails as WasteGuideDetailsType} from '@/modules/waste-guide/types'
import {DeviceContext} from '@/providers'

type Props = {
  details: WasteGuideDetailsType | undefined
  footerLink?: {
    text: string
    onPress: () => void
  }
  illustration?: ReactNode
}

export const WasteGuideDetails = ({
  details,
  footerLink,
  illustration,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<WasteGuideStackParams, WasteGuideRouteName.wasteGuide>
    >()

  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  if (!details) {
    return null
  }

  const {appointmentUrl, collectionDays, howToOffer, remark, whenToPutOut} =
    details

  return (
    <Track gutter={isLandscape ? 'xl' : 'md'} reverse={isLandscape}>
      {!!illustration && (
        <Column flex={1}>
          <Figure height={192}>{illustration}</Figure>
        </Column>
      )}
      <Column flex={1} gutter="md">
        {appointmentUrl ? (
          <Column gutter="md">
            <Paragraph>
              Maak een afspraak, dan komen we het grof afval bij u ophalen.
            </Paragraph>
            <Button
              accessibilityRole="link"
              label="Haal mijn grof afval op"
              onPress={() =>
                navigation.navigate(WasteGuideRouteName.bulkyWasteAppointment, {
                  url: appointmentUrl,
                })
              }
            />
          </Column>
        ) : (
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
        )}
        {!!footerLink && (
          <NavigationButton
            label={footerLink.text}
            onPress={footerLink.onPress}
          />
        )}
      </Column>
    </Track>
  )
}
