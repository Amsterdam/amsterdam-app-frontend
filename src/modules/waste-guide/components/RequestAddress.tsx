import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {AddressModalName} from '@/modules/address/routes'
import {HouseholdWasteToContainerImage} from '@/modules/waste-guide/assets/images'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {DeviceContext} from '@/providers/device.provider'
import {useTheme} from '@/themes/useTheme'

export const RequestAddress = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, WasteGuideRouteName.wasteGuide>
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
