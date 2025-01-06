import simplur from 'simplur'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = {
  index?: number
}

export const ShowCityPassButton = ({index}: Props) => {
  const {navigate} = useNavigation()
  const secureCityPasses = useGetSecureCityPasses()

  return (
    <Button
      iconName="city-pass-pass"
      label={simplur`Laat mijn [pas|passen] zien${[secureCityPasses?.length]} `}
      onPress={() => {
        navigate(CityPassRouteName.cityPasses, {index})
      }}
      testID="CityPassShowPassesButton"
    />
  )
}
