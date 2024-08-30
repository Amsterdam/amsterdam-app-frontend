import {skipToken} from '@reduxjs/toolkit/query'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {CityPassCard} from '@/modules/city-pass/components/CityPassCard'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useSetSecureCityPasses} from '@/modules/city-pass/hooks/useSetSecureCityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {RedirectKey} from '@/modules/redirects/types'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  logout: () => void
}

export const PassOwners = ({logout}: Props) => {
  const {navigate} = useNavigation()
  const openRedirect = useOpenRedirect()
  const {item: secureAccessToken} = useGetSecureItem(
    SecureItemKey.cityPassAccessToken,
  )

  const {
    data: cityPasses,
    isLoading,
    isError,
  } = useGetCityPassesQuery(secureAccessToken ? secureAccessToken : skipToken)

  useSetSecureCityPasses(cityPasses)

  if (isLoading) {
    return <PleaseWait testID="CityPassDashboardPleaseWait" />
  }

  if (isError || !cityPasses) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="CityPassDashboardSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  return (
    <Box
      insetBottom="xl"
      insetHorizontal="md"
      insetTop="md">
      {cityPasses.length ? (
        <Column gutter="md">
          <ShowCityPassButton />
          <Gutter height="sm" />
          {cityPasses.map(cityPass => {
            const {id} = cityPass

            return (
              <CityPassCard
                cityPass={cityPass}
                key={id}
                onPress={() =>
                  navigate(CityPassRouteName.cityPassDetails, {
                    passNumber: cityPass.passNumber,
                  })
                }
                testID={`CityPassOwnerButton-${id}`}
              />
            )
          })}
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
          <Button
            accessibilityRole="link"
            label="Stadspas aanvragen"
            onPress={() => openRedirect(RedirectKey.cityPassRequest)}
            testID="CityPassRequestButton"
            variant="secondary"
          />
          <Gutter height="lg" />
          <Button
            label="Uitloggen"
            onPress={logout}
            testID="CityPassLogoutButton"
          />
        </>
      )}
    </Box>
  )
}
