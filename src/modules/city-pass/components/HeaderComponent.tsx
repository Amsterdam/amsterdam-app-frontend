import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectCityPass, showCityPasses} from '@/modules/city-pass/slice'

export const HeaderComponent = () => {
  const dispatch = useDispatch()
  const hasCityPass = !!useSelector(selectCityPass)

  if (!hasCityPass) {
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