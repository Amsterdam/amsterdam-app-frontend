import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassCard} from '@/modules/city-pass/components/CityPassCard'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {passOwner as passOwnerMock} from '@/modules/city-pass/mocks/passOwner'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {RedirectKey} from '@/modules/redirects/types'

type Props = {
  logout: () => void
}

export const PassOwners = ({logout}: Props) => {
  const {navigate} = useNavigation()
  const {sub_pashouders, ...pashouder} = passOwnerMock
  const passOwners = [pashouder, ...sub_pashouders]
  const passOwnersWithActivePass = passOwners.filter(({passen}) =>
    passen.some(({actief}) => actief === true),
  )
  const openRedirect = useOpenRedirect()

  return (
    <Box
      insetBottom="xl"
      insetHorizontal="md"
      insetTop="md">
      {passOwnersWithActivePass.length ? (
        <Column gutter="md">
          <ShowCityPassButton passCount={passOwnersWithActivePass.length} />
          <Gutter height="sm" />
          {passOwnersWithActivePass.map(passOwner => {
            const {id} = passOwner

            return (
              <CityPassCard
                key={id}
                onPress={() =>
                  navigate(CityPassRouteName.cityPassDetails, {
                    passOwner,
                  })
                }
                passOwner={passOwner}
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
