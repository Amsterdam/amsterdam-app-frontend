import simplur from 'simplur'
import {Button} from '@/components/ui/buttons/Button'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {showCityPasses} from '@/modules/city-pass/slice'

type Props = {
  index?: number
}

export const ShowCityPassButton = ({index}: Props) => {
  const dispatch = useDispatch()
  const secureCityPasses = useGetSecureCityPasses()

  return (
    <Button
      iconName="city-pass-pass"
      label={simplur`Laat mijn [pas|passen] zien${[secureCityPasses?.length]} `}
      onPress={() => {
        dispatch(showCityPasses(index))
      }}
      testID="CityPassShowPassesButton"
    />
  )
}
