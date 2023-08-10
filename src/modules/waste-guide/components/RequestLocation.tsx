import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {AddressModalName} from '@/modules/address/routes'
import {HouseholdWasteToContainerImage} from '@/modules/waste-guide/assets/images'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useTheme} from '@/themes/useTheme'

export const RequestLocation = () => {
  const navigation = useNavigation<WasteGuideRouteName>()
  const {isLandscape} = useDeviceContext()
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
