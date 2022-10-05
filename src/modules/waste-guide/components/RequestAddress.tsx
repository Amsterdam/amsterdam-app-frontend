import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {RootStackParams} from '@/app/navigation'
import {Location} from '@/assets/icons'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {module} from '@/modules/waste-guide'
import {
  CanalHouseFacadesImage,
  WasteGuideHomeImage,
} from '@/modules/waste-guide/assets/images'
import {Device, DeviceContext} from '@/providers'

export const RequestAddress = () => {
  const insets = useSafeAreaInsets()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, typeof module.slug>>()

  const {isLandscape} = useContext(DeviceContext)
  const styles = createStyles(insets, isLandscape)

  return (
    <Column align="between" grow>
      <View style={styles.horizontalInset}>
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
      </View>
      <View style={styles.rowOfCanalHouseFacadesImage}>
        <CanalHouseFacadesImage />
      </View>
      <Box>
        <Figure
          height={256}
          style={styles.twoPeopleBringingHouseholdWasteImage}>
          <WasteGuideHomeImage />
        </Figure>
      </Box>
    </Column>
  )
}

const createStyles = (
  insets: EdgeInsets,
  isLandscape: Device['isLandscape'],
) => {
  const height = 192
  const rowOfCanalHouseFacadesImageAspectRatio = 1743 / 202

  return StyleSheet.create({
    horizontalInset: {
      paddingLeft: isLandscape ? insets.left : undefined,
      paddingRight: isLandscape ? insets.right : undefined,
    },
    rowOfCanalHouseFacadesImage: {
      width: height * rowOfCanalHouseFacadesImageAspectRatio,
      height,
      alignSelf: 'center',
      position: 'relative',
      top: 80,
      zIndex: -1,
      marginTop: isLandscape ? -160 : undefined,
      marginLeft: isLandscape ? -insets.left : undefined,
    },
    twoPeopleBringingHouseholdWasteImage: {
      marginTop: isLandscape ? -32 : undefined,
    },
  })
}
