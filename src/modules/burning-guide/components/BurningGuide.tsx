import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {BurningGuideForecastList} from '@/modules/burning-guide/components/BurningGuideForecastList'
import {BurningGuideRecommendation} from '@/modules/burning-guide/components/BurningGuideRecommendation'
import {useGetForecast} from '@/modules/burning-guide/hooks/useGetForecast'

type Props = {postalArea: string}

export const BurningGuide = ({postalArea}: Props) => {
  const {forecast, isError, isLoading} = useGetForecast(postalArea)

  if (isLoading) {
    return <PleaseWait testID="BurningGuideForecastListPleaseWait" />
  }

  if (!forecast?.length || !postalArea || isError) {
    return (
      <SomethingWentWrong testID="BurningGuideForecastListSomethingWentWrong" />
    )
  }

  const recommendation = forecast[0]
  const forecastList = forecast.slice(1)

  return (
    <>
      <BurningGuideRecommendation recommendation={recommendation} />
      <BurningGuideForecastList list={forecastList} />
    </>
  )
}
