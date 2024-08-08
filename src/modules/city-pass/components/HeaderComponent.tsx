import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {showCityPasses} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const HeaderComponent = () => {
  const dispatch = useDispatch()
  const {item: secureCityPasses, isLoading} = useGetSecureItem(
    SecureItemKey.cityPasses,
  )

  if (!secureCityPasses || isLoading) {
    return null
  }

  return (
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
  )
}
