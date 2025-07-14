import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {List} from '@/components/ui/text/list/List'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useBlockPassMutation} from '@/modules/city-pass/service'

type Props = NavigationProps<CityPassRouteName.cityPassBlockPass>

export const CityPassBlockPassScreen = ({navigation, route}: Props) => {
  const {params} = route
  const {passNumber} = params || {}
  const openPhoneUrl = useOpenPhoneUrl()
  const [blockPass, {isLoading, isError}] = useBlockPassMutation()

  const handleBlockPass = () => {
    void blockPass(passNumber)
      .unwrap()
      .then(() => {
        navigation.pop(2)
      })
  }

  return (
    <Screen testID="CityPassBlockPassScreen">
      <Box>
        <Column gutter="lg">
          <List
            items={[
              'Is je pas gestolen of kwijt? Blokkeer de pas om misbruik te voorkomen.',
              <Phrase>
                Pas teruggevonden? Bel naar{' '}
                <Phrase
                  color="link"
                  onPress={() => openPhoneUrl('0202526000')}
                  underline>
                  020 252 6000
                </Phrase>
                . Daarna kun je de pas meteen weer gebruiken.
              </Phrase>,
            ]}
            testID="CityPassBlockPassInfoList"
          />
          <Column gutter="md">
            <Button
              isError={isError}
              isLoading={isLoading}
              label="Ja, blokkeer mijn pas"
              onPress={handleBlockPass}
              testID="CityPassBlockPassButton"
            />
            <Button
              label="Nee, blokkeer mijn pas niet"
              onPress={() => navigation.pop(2)}
              testID="CityPassBlockPassRejectedButton"
              variant="secondary"
            />
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
