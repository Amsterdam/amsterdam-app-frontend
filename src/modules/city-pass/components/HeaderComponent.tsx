import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {Placement} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {showCityPasses} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

const ONBOARDING_TIP = 'Druk op de knop om je Stadspas te laten zien'

export const HeaderComponent = () => {
  const dispatch = useDispatch()
  const {item: secureCityPasses, isLoading} = useGetSecureItem(
    SecureItemKey.cityPasses,
  )

  if (!secureCityPasses || isLoading) {
    return null
  }

  return (
    <ProductTourTipWrapper
      extraSpace="md"
      placement={Placement.below}
      testID="ConstructionWorkProjectFollowButtonTooltip"
      text={ONBOARDING_TIP}
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
