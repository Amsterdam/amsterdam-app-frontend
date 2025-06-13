import {useCallback} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/city-pass/alerts'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {logout} from '@/modules/city-pass/utils/logout'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<CityPassRouteName.cityPassLogout>

export const LogoutScreen = ({navigation}: Props) => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    logout('logoutSuccess', dispatch).catch(() => {
      setAlert(alerts.logoutFailed)
    })
  }, [setAlert, dispatch])

  const cancel = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Screen
      hasStickyAlert
      testID="CityPassLogoutScreen">
      <Box>
        <Title text="Weet je zeker dat je wilt uitloggen?" />
        <Gutter height="sm" />
        <Paragraph>
          Als je meerdere passen hebt, worden die allemaal uitgelogd. Je kunt je
          Stadspas altijd weer toevoegen door in te loggen.
        </Paragraph>
        <Gutter height="xl" />
        <Button
          label="Annuleren"
          onPress={cancel}
          testID="CityPassLoginButton"
          variant="secondary"
        />
        <Gutter height="md" />
        <Button
          label="Uitloggen"
          onPress={onLogout}
          testID="CityPassLogoutButton"
          variant="primary"
        />
      </Box>
    </Screen>
  )
}
