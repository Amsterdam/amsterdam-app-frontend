import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Accordion} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {Address} from '@/modules/address'
import {module as wasteGuideModule} from '@/modules/waste-guide'
import {
  BulkyWasteAtRoadsideImage,
  BulkyWasteByCarImage,
  HouseHoldWasteAtRoadsideImage,
  HouseholdWasteToContainerImage,
  PlayingNearContainersImage,
} from '@/modules/waste-guide/assets/images'
import {WasteGuideDetails} from '@/modules/waste-guide/components'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteGuide, WasteType} from '@/modules/waste-guide/types'
import {DeviceContext} from '@/providers'

type Props = {
  address: Address
  wasteGuide: WasteGuide
}

export const WasteGuideForAmsterdam = ({address, wasteGuide}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  const addressCoordinates = {
    lon: address.centroid[1],
    lat: address.centroid[0],
  }

  return (
    <>
      {wasteGuide[WasteType.Bulky] && (
        <Accordion title={wasteGuide[WasteType.Bulky]?.title ?? ''}>
          <WasteGuideDetails
            details={wasteGuide[WasteType.Bulky]}
            footerLink={{
              onPress: () =>
                navigation.navigate(WasteGuideRouteName.whereToPutBulkyWaste),
              text: 'Grof afval: buiten zetten of naar een Afvalpunt?',
            }}
            illustration={
              wasteGuide[WasteType.Bulky]?.getsCollected ? (
                <BulkyWasteAtRoadsideImage />
              ) : (
                <BulkyWasteByCarImage />
              )
            }
          />
        </Accordion>
      )}
      {wasteGuide[WasteType.Household] && (
        <Accordion title={wasteGuide[WasteType.Household]?.title ?? ''}>
          <WasteGuideDetails
            details={wasteGuide[WasteType.Household]}
            illustration={
              wasteGuide[WasteType.Household]?.howToOffer?.includes(
                'container',
              ) ? (
                <HouseholdWasteToContainerImage />
              ) : (
                <HouseHoldWasteAtRoadsideImage />
              )
            }
          />
        </Accordion>
      )}
      <Accordion title="Containers in de buurt">
        <Track
          gutter={isLandscape ? 'xl' : 'md'}
          reverse={isLandscape}
          align="between">
          <Figure height={192}>
            <PlayingNearContainersImage />
          </Figure>
          <Column gutter="md">
            <Paragraph>
              Zoekt u een container voor glas, papier, textiel, plastic
              verpakkingen of restafval?
            </Paragraph>
            <Button
              label="Bekijk containers in de buurt"
              onPress={() =>
                navigation.navigate(
                  WasteGuideRouteName.wasteGuideContainers,
                  addressCoordinates,
                )
              }
              variant="secondary"
            />
          </Column>
        </Track>
      </Accordion>
      <Accordion title="Afvalpunten">
        <Track
          gutter={isLandscape ? 'xl' : 'md'}
          reverse={isLandscape}
          align="between">
          <Figure height={192}>
            <BulkyWasteByCarImage />
          </Figure>
          <Column gutter="md">
            <Paragraph>
              Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch afval
              en spullen voor de kringloop kwijt.
            </Paragraph>
            <Button
              label="Bekijk Afvalpunten op de kaart"
              onPress={() =>
                navigation.navigate(
                  WasteGuideRouteName.wasteGuideCollectionPoints,
                  addressCoordinates,
                )
              }
              variant="secondary"
            />
          </Column>
        </Track>
      </Accordion>
    </>
  )
}
