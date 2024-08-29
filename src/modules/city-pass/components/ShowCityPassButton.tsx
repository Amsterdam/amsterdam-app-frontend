import simplur from 'simplur'
import {Button} from '@/components/ui/buttons/Button'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {showCityPasses} from '@/modules/city-pass/slice'

type Props = {
  index?: number
  passCount: number
}

export const ShowCityPassButton = ({index, passCount}: Props) => {
  const dispatch = useDispatch()

  return (
    <Button
      iconName="city-pass-pass"
      label={simplur`Laat mijn [pas|passen] zien${[passCount]}`}
      onPress={() => {
        dispatch(showCityPasses(index))
      }}
      testID="CityPassLogoutButton"
    />
  )
}
