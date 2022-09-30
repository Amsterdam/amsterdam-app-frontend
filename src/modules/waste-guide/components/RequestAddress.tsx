import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '_app/navigation'
import {AddressModalName} from '_modules/address/routes'
import {module as wasteGuideModule} from '_modules/waste-guide'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {Location} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {
  RowOfCanalHouseFacadesImage,
  TwoPeopleBringingHouseholdWasteImage,
} from '@/modules/waste-guide/assets/images'
import {DeviceContext} from '@/providers'

export const RequestAddress = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()

  const {isLandscape} = useContext(DeviceContext)
  const styles = createStyles(isLandscape)

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
              onPress={() =>
                navigation.navigate(AddressModalName.addressForm, {
                  addressIsTemporary: true,
                })
              }
            />
          </Row>
        </Column>
      </Box>
      <View style={styles.rowOfCanalHouseFacadesImage}>
        <RowOfCanalHouseFacadesImage />
      </View>
      <Figure height={256} style={styles.twoPeopleBringingHouseholdWasteImage}>
        <TwoPeopleBringingHouseholdWasteImage />
      </Figure>
    </Column>
  )
}

const createStyles = (isLandscape: boolean) => {
  const height = 192
  const rowOfCanalHouseFacadesImageAspectRatio = 1743 / 202

  return StyleSheet.create({
    rowOfCanalHouseFacadesImage: {
      width: height * rowOfCanalHouseFacadesImageAspectRatio,
      height,
      alignSelf: 'center',
      position: 'relative',
      top: 80,
      zIndex: -1,
      marginTop: isLandscape ? -160 : undefined,
    },
    twoPeopleBringingHouseholdWasteImage: {
      marginTop: isLandscape ? -32 : undefined,
    },
  })
}
