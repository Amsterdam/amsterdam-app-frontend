import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps, useMemo} from 'react'
import {useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Edit, Location} from '@/assets/icons'
import {Accordion, Box} from '@/components/ui'
import {Button, IconButton} from '@/components/ui/buttons'
import {PleaseWait} from '@/components/ui/feedback'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Figure, Icon} from '@/components/ui/media'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {selectAddress} from '@/modules/address/slice'
import {module as wasteGuideModule} from '@/modules/waste-guide'
import {
  BulkyWasteCollected,
  BulkyWasteNotCollected,
  ContainersNearby,
  HouseholdWasteByTheRoad,
  WasteGuide,
  WasteGuideBackground,
} from '@/modules/waste-guide/assets/images'
import {
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
} from '@/modules/waste-guide/components'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {WasteType} from '@/modules/waste-guide/types'
import {transformWasteGuideResponse} from '@/modules/waste-guide/utils'
import {useEnvironment} from '@/store'
import {Theme, useThemable} from '@/themes'

export const WasteGuideByAddress = () => {
  const {primary, temp} = useSelector(selectAddress)
  const address = temp ?? primary
  const iconProps = useThemable(createIconProps)

  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  const {data, isLoading} = useGetGarbageCollectionAreaQuery(
    {
      lon: address?.centroid[0] ?? '',
      lat: address?.centroid[1] ?? '',
    },
    {skip: !address},
  )

  const environment = useEnvironment()

  const wasteGuide = useMemo(
    () => data && transformWasteGuideResponse(data, address, environment),
    [address, data, environment],
  )

  const wasteGuideLength = wasteGuide && Object.keys(wasteGuide).length

  const navigateToAddressForm = () => {
    navigation.navigate(AddressModalName.addressForm, {
      addressIsTemporary: true,
    })
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (!address) {
    return (
      <Column align="between" grow>
        <Box>
          <Column gutter="md">
            <Paragraph>
              Vul uw adres in zodat we de juiste informatie kunnen tonen.
            </Paragraph>
            <Row>
              <Button
                icon={Location}
                label="Vul uw adres in"
                onPress={navigateToAddressForm}
              />
            </Row>
          </Column>
        </Box>
        <Figure height={192}>
          <WasteGuideBackground />
        </Figure>
      </Column>
    )
  }

  return (
    <Column align="between" gutter="sm" grow>
      <Column grow>
        <Box>
          <Row gutter="sm" valign="center">
            <Phrase>{address.adres}</Phrase>
            <IconButton
              icon={
                <Icon>
                  <Edit {...iconProps} />
                </Icon>
              }
              onPress={navigateToAddressForm}
            />
          </Row>
        </Box>
        {wasteGuideLength === undefined ? (
          <Box>
            <Title level="h4" text="Gegevens ophalen…" />
            <PleaseWait />
          </Box>
        ) : wasteGuideLength === 0 ? (
          <WasteGuideByAddressNoDetails address={address} />
        ) : (
          <Column>
            <Box insetHorizontal="md">
              {wasteGuide?.[WasteType.Bulky] && (
                <Accordion title={wasteGuide[WasteType.Bulky]?.title ?? ''}>
                  <Column gutter="md">
                    <WasteGuideByAddressDetails
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      details={wasteGuide[WasteType.Bulky]!}
                      footerLink={{
                        onPress: () =>
                          navigation.navigate(
                            WasteGuideRouteName.whereToPutBulkyWaste,
                          ),
                        text: 'Grof afval: buiten zetten of naar een afvalpunt?',
                      }}
                      illustration={<BulkyWasteCollected />}
                    />
                  </Column>
                </Accordion>
              )}
              {wasteGuide?.[WasteType.Household] && (
                <Accordion title={wasteGuide[WasteType.Household]?.title ?? ''}>
                  <Column gutter="md">
                    <WasteGuideByAddressDetails
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      details={wasteGuide[WasteType.Household]!}
                      illustration={<HouseholdWasteByTheRoad />}
                    />
                  </Column>
                </Accordion>
              )}
              <Accordion title="Containers in de buurt">
                <Column gutter="md">
                  <Figure height={192}>
                    <ContainersNearby />
                  </Figure>
                  <Paragraph>
                    Zoekt u een container voor glas, papier, textiel, plastic
                    verpakkingen of restafval?
                  </Paragraph>
                  <Button
                    label="Toon containers in de buurt"
                    onPress={() =>
                      navigation.navigate(
                        WasteGuideRouteName.wasteGuideContainers,
                      )
                    }
                    variant="secondary"
                  />
                </Column>
              </Accordion>
              <Accordion title="Afvalpunten">
                <Column gutter="md">
                  <Figure height={192}>
                    <BulkyWasteNotCollected />
                  </Figure>
                  <Paragraph>
                    Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch
                    afval en spullen voor de kringloop kwijt.
                  </Paragraph>
                  <Button
                    label="Toon dichtstbijzijnde afvalpunt"
                    onPress={() =>
                      navigation.navigate(
                        WasteGuideRouteName.wasteGuideCollectionPoints,
                      )
                    }
                    variant="secondary"
                  />
                </Column>
              </Accordion>
            </Box>
          </Column>
        )}
      </Column>
      <>
        <Gutter height="xxxl" />
        <Figure height={192}>
          <WasteGuide />
        </Figure>
      </>
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
