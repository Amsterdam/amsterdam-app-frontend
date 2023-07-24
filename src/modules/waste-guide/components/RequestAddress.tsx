import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {FigureWithFacadesBackground} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {AddressModalName} from '@/modules/address/routes'
import {wasteGuideModule} from '@/modules/waste-guide'
import {HouseholdWasteToContainerImage} from '@/modules/waste-guide/assets/images'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

export const RequestAddress = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof wasteGuideModule.slug>
    >()
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()

  return (
    <Column
      align="between"
      grow>
      <HorizontalSafeArea>
        <Box>
          <Column gutter="md">
            <Title text="Voor welk adres wilt u informatie over afval?" />
            <Row>
              <Button
                iconName="location"
                label="Vul uw adres in"
                onPress={() =>
                  navigation.navigate(AddressModalName.addressForm)
                }
                testID="WasteGuideEnterAddressButton"
              />
            </Row>
          </Column>
        </Box>
      </HorizontalSafeArea>
      <FigureWithFacadesBackground
        height={media.figureHeight.lg}
        Image={<HouseholdWasteToContainerImage />}
        imageAspectRatio={media.illustrationAspectRatio.landscape}
        imageWidth={media.illustrationWidth.wide}
        moveUp={isLandscape ? 128 : undefined}
      />
    </Column>
  )
}
