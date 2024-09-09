import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {Placement} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {showCityPasses} from '@/modules/city-pass/slice'

export const HeaderComponent = () => {
  const dispatch = useDispatch()
  const secureCityPasses = useGetSecureCityPasses()

  if (!secureCityPasses?.length) {
    return null
  }

  return (
    <ProductTourTipWrapper
      extraSpace="md"
      placement={Placement.below}
      testID="ConstructionWorkProjectFollowButtonTooltip"
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
        onPress={() => dispatch(showCityPasses())}
        testID="HeaderCityPassButton"
      />
    </ProductTourTipWrapper>
  )
}
