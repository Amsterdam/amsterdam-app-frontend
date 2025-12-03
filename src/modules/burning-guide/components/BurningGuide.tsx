import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {BurningGuideForecastList} from '@/modules/burning-guide/components/BurningGuideForecastList'
import {BurningGuideRecommendation} from '@/modules/burning-guide/components/BurningGuideRecommendation'
import {useGetForecast} from '@/modules/burning-guide/hooks/useGetForecast'

type Props = {zipCode: string}

export const BurningGuide = ({zipCode}: Props) => {
  const {forecast, isError, isLoading} = useGetForecast(zipCode)

  if (isLoading) {
    return <PleaseWait testID="BurningGuideForecastListPleaseWait" />
  }

  if (!forecast || isError) {
    return (
      <SomethingWentWrong testID="BurningGuideForecastListSomethingWentWrong" />
    )
  }

  const recommendation = forecast[0]
  const forecastList = forecast.slice(1, forecast.length)

  return (
    <>
      <BurningGuideRecommendation recommendation={recommendation} />
      <BurningGuideForecastList list={forecastList} />
    </>
  )
}
