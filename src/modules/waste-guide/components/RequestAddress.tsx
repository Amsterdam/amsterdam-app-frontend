import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Location} from '@/assets/icons'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {module} from '@/modules/waste-guide'
import {
  CanalHouseFacadesImage,
  WasteGuideHomeImage,
} from '@/modules/waste-guide/assets/images'

export const RequestAddress = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, typeof module.slug>>()

  const figureHeight = 320
  const styles = createStyles(figureHeight)

  return (
    <Column align="between" grow>
      <HorizontalSafeArea>
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
      </HorizontalSafeArea>
      <Figure height={figureHeight}>
        <View style={styles.backgroundImage}>
          <CanalHouseFacadesImage />
        </View>
        <View style={styles.image}>
          <WasteGuideHomeImage />
        </View>
      </Figure>
    </Column>
  )
}

const createStyles = (figureHeight: number) => {
  const imageAspectRatio = 311 / 276
  const imageWidth = 288
  const imageHeight = imageWidth / imageAspectRatio

  return StyleSheet.create({
    backgroundImage: {
      aspectRatio: 1743 / 202,
      position: 'absolute',
      height: 160,
      marginBottom: figureHeight - 160,
      alignSelf: 'center',
    },
    image: {
      aspectRatio: imageAspectRatio,
      height: imageHeight,
      marginTop: figureHeight - imageHeight, // Absolute positioning with `bottom: 0` doesn’t seem to work.
      alignSelf: 'center',
    },
  })
}
