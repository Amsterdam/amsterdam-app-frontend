import {Route} from '@react-navigation/native'
import {MenuHeaderButton} from '@/components/ui/menus/MenuHeaderButton'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'

type Props = {
  route: Route<string>
}

export const CityPassDetailsHeaderButton = ({route}: Props) => {
  const {params} = route as {params?: {passNumber: string}}
  const {data} = useGetCityPassesQuery()

  const cityPass = data?.find(
    cp => cp.passNumber === Number(params?.passNumber),
  )

  return cityPass?.actief ? (
    <MenuHeaderButton testID="CityPassDetailsHeaderButton" />
  ) : null
}
