import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Location} from '@/assets/icons'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {FigureWithCanalHouseFacadesBackground} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {module} from '@/modules/waste-guide'
import {WasteGuideHomeImage} from '@/modules/waste-guide/assets/images'

export const RequestAddress = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, typeof module.slug>>()

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
      <FigureWithCanalHouseFacadesBackground
        backgroundImageHeightFraction={0.5}
        height={320}
        Image={<WasteGuideHomeImage />}
        imageAspectRatio={311 / 276}
        imageWidth={288}
      />
    </Column>
  )
}
