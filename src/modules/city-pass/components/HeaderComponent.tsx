import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {ModuleSlug} from '@/modules/slugs'

export const HeaderComponent = () => {
  const {navigate} = useNavigation()
  const secureCityPasses = useGetSecureCityPasses()

  if (!secureCityPasses?.length) {
    return null
  }

  return (
    <ProductTourTipWrapper
      extraSpace="md"
      placement={Placement.below}
      testID="HeaderShowCityPassesTooltip"
      tipSlug={Tip.cityPassShowPassesButton}>
      <IconButton
        accessibilityLabel="Toon Stadspas"
        icon={
          <Icon
            color="link"
            name="city-pass-pass"
            size="lg"
            testID="HeaderCityPassIcon"
          />
        }
        onPress={() =>
          navigate(ModuleSlug['city-pass'], {
            screen: CityPassRouteName.cityPasses,
          })
        }
        testID="HeaderCityPassButton"
      />
    </ProductTourTipWrapper>
  )
}
