import simplur from 'simplur'
import {Button} from '@/components/ui/buttons/Button'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {showCityPasses} from '@/modules/city-pass/slice'

type Props = {
  passCount: number
}

export const ShowCityPassButton = ({passCount}: Props) => {
  const dispatch = useDispatch()

  return (
    <Button
      iconName="city-pass"
      label={simplur`Laat mijn [pas|passen] zien${[passCount]}`}
      onPress={() => {
        dispatch(showCityPasses())
      }}
      testID="CityPassLogoutButton"
    />
  )
}
