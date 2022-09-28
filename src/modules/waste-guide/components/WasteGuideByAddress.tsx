import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps, useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
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
  BringingBulkyWasteByCarImage,
  BulkyAndHouseholdWasteImage,
  PlayingNearContainersImage,
  PuttingBulkyWasteAtTheRoadsideImage,
  PuttingHouseHoldWasteAtTheRoadsideImage,
  RowOfCanalHouseFacadesImage,
  TwoPeopleBringingHouseholdWasteImage,
} from '@/modules/waste-guide/assets/images'
import {
  WasteGuideByAddressDetails,
  WasteGuideByAddressNoDetails,
} from '@/modules/waste-guide/components'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {WasteType} from '@/modules/waste-guide/types'
import {transformWasteGuideResponse} from '@/modules/waste-guide/utils'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {Theme, useThemable} from '@/themes'

export const WasteGuideByAddress = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  const {primary, temp} = useSelector(selectAddress)
  const address = temp ?? primary

  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  const iconProps = useThemable(createIconProps)
  const styles = createStyles(isLandscape)

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
        <View style={styles.wideImageContainer}>
          <RowOfCanalHouseFacadesImage />
        </View>
        <Figure height={256}>
          <TwoPeopleBringingHouseholdWasteImage />
        </Figure>
      </Column>
    )
  }

  const addressCoordinates = {
    lon: address.centroid[1],
    lat: address.centroid[0],
  }

  return (
    <Column align="between" gutter="sm" grow>
      <Column grow>
        <Box>
          <Row gutter="sm" valign="center">
            <Phrase>{address.adres}</Phrase>
            <IconButton
              accessibilityLabel="Wijzig adres"
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
                        text: 'Grof afval: buiten zetten of naar een Afvalpunt?',
                      }}
                      illustration={<PuttingBulkyWasteAtTheRoadsideImage />}
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
                      illustration={<PuttingHouseHoldWasteAtTheRoadsideImage />}
                    />
                  </Column>
                </Accordion>
              )}
              <Accordion title="Containers in de buurt">
                <Track gutter="md">
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
                <Track gutter="md">
                  <Figure height={192}>
                    <BringingBulkyWasteByCarImage />
                  </Figure>
                  <Column gutter="md">
                    <Paragraph>
                      Op een Afvalpunt kunt u gratis uw grof afval, klein
                      chemisch afval en spullen voor de kringloop kwijt.
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
            </Box>
          </Column>
        )}
      </Column>
      <>
        <Gutter height="xxxl" />
        <Figure height={192}>
          <BulkyAndHouseholdWasteImage />
        </Figure>
      </>
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})

const createStyles = (isLandscape: boolean) => {
  const height = 192

  return StyleSheet.create({
    wideImageContainer: {
      width: (1743 / 202) * height,
      height,
      alignSelf: 'center',
      position: 'relative',
      top: 80,
      zIndex: -1,
      marginTop: isLandscape ? -160 : undefined,
    },
  })
}
