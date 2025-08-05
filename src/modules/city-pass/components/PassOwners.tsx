import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {ShowCityPassButtonSkeleton} from '@/modules/city-pass/components/ShowCityPassButton.skeleton'
import {CityPassCard} from '@/modules/city-pass/components/card-display/CityPassCard'
import {CityPassCardSkeleton} from '@/modules/city-pass/components/card-display/CityPassCard.skeleton'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {useSetSecureCityPasses} from '@/modules/city-pass/hooks/useSetSecureCityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {RedirectKey} from '@/modules/redirects/types'

type Props = {
  logout: () => void
}

export const PassOwners = ({logout}: Props) => {
  const {navigate} = useNavigation()
  const secureCityPasses = useGetSecureCityPasses()

  const {data, isLoading, isError} = useGetCityPassesQuery()

  const cityPasses = data ?? secureCityPasses

  useSetSecureCityPasses(data)

  const onPressCityPassCard = (passNumber?: number) => {
    if (!passNumber) {
      return
    }

    navigate(CityPassRouteName.cityPassDetails, {
      passNumber,
    })
  }

  if (isLoading) {
    return (
      <Box
        insetBottom="xl"
        insetHorizontal="md"
        insetTop="md">
        <Column gutter="md">
          <ShowCityPassButtonSkeleton isLoading />
          <Gutter height="sm" />
          <CityPassCardSkeleton isLoading />
        </Column>
      </Box>
    )
  }

  return (
    <Box
      insetBottom="xl"
      insetHorizontal="md"
      insetTop="md">
      {cityPasses.length ? (
        <Column gutter="lg">
          <ShowCityPassButton />
          {isError ? (
            <SomethingWentWrong
              testID="CityPassDashboardSomethingWentWrong"
              text={SOMETHING_WENT_WRONG_TEXT}
              title=""
            />
          ) : (
            <Column gutter="md">
              {cityPasses.map((cityPass, index) => (
                <CityPassCard
                  cityPass={cityPass}
                  key={cityPass.passNumberComplete}
                  onPress={() => {
                    if ('passNumber' in cityPass) {
                      onPressCityPassCard(cityPass.passNumber)
                    }
                  }}
                  testID={`CityPassOwner${index}Button`}
                />
              ))}
            </Column>
          )}
        </Column>
      ) : (
        <>
          <Title text="Je hebt geen Stadspas" />
          <Gutter height="sm" />
          <Paragraph>
            De Stadspas is voor Amsterdammers met een laag inkomen en weinig
            vermogen. Bekijk of je recht hebt op een Stadspas.
          </Paragraph>
          <Gutter height="lg" />
          <ExternalLinkButton
            label="Stadspas aanvragen"
            redirectKey={RedirectKey.cityPassRequest}
            testID="CityPassRequestExternalLinkButton"
            variant="secondary"
          />
          <Gutter height="lg" />
          <Button
            label="Uitloggen"
            onPress={logout}
            testID="CityPassLogoutExternalLinkButton"
          />
        </>
      )}
    </Box>
  )
}
