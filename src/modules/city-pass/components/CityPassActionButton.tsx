import {useCallback} from 'react'
import {ActionButton} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'

export const CityPassActionButton = () => {
  const {navigate} = useNavigation()
  const secureCityPasses = useGetSecureCityPasses()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)

  const onPress = useCallback(() => {
    navigate(ModuleSlug['city-pass'], {
      screen: CityPassRouteName.cityPasses,
    })
  }, [navigate])

  if (!secureCityPasses?.length || !isCityPassOwnerRegistered) {
    return null
  }

  return (
    <Column>
      <ActionButton
        iconName="city-pass-pass"
        label="Stadspas"
        onPress={onPress}
        testID="CityPassActionButton"
      />
      <Gutter height="lg" />
    </Column>
  )
}
