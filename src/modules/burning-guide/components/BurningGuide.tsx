import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSelectedPostalArea} from '@/modules/address/hooks/useSelectedPostalArea'
import {BurningGuideForecastList} from '@/modules/burning-guide/components/BurningGuideForecastList'
import {BurningGuideRecommendation} from '@/modules/burning-guide/components/BurningGuideRecommendation'
import {useGetForecast} from '@/modules/burning-guide/hooks/useGetForecast'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuide = () => {
  const {
    postalArea,
    isFetching,
    isError: isErrorPostalArea,
  } = useSelectedPostalArea(ModuleSlug['burning-guide'])
  const {forecast, isError, isLoading} = useGetForecast(postalArea)

  if (isLoading || isFetching) {
    return <PleaseWait testID="BurningGuideForecastListPleaseWait" />
  }

  if (!forecast?.length || !postalArea || isError || isErrorPostalArea) {
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
