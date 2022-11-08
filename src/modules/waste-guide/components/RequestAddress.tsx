import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {FigureWithCanalHouseFacadesBackground} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {module} from '@/modules/waste-guide'
import {WasteGuideHomeImage} from '@/modules/waste-guide/assets/images'
import {Device, DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

export const RequestAddress = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, typeof module.slug>>()
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()
  const styles = createStyles(isLandscape)

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
                iconName="location"
                label="Vul uw adres in"
                onPress={() =>
                  navigation.navigate(AddressModalName.addressForm)
                }
              />
            </Row>
          </Column>
        </Box>
      </HorizontalSafeArea>
      <View style={styles.moveFigureUp}>
        <FigureWithCanalHouseFacadesBackground
          backgroundImageHeightFraction={0.5}
          height={media.figureHeight.xl}
          Image={<WasteGuideHomeImage />}
          imageAspectRatio={media.imageAspectRatio.wasteGuideHome}
          imageWidth={media.imageWidth.wasteGuideHome}
        />
      </View>
    </Column>
  )
}

const createStyles = (isLandscape: Device['isLandscape']) =>
  StyleSheet.create({
    moveFigureUp: {
      marginTop: isLandscape ? -80 : undefined,
      zIndex: isLandscape ? -1 : undefined,
    },
  })
