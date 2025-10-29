import {ReactNode, useCallback, useEffect, useState} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useHandleLoginDeeplink} from '@/modules/mijn-amsterdam/hooks/useHandleLoginDeeplink'
import {useLoginMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useLoginMijnAmsterdam'
import {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'

type Props = NavigationProps<MijnAmsterdamRouteName.settings>

export const MijnAmsterdamSettingsScreen = ({route}: Props) => {
  const {loginResult} = route.params || {}
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // TODO: check if user is logged in once endpoint is ready
  const login = useLoginMijnAmsterdam()

  useHandleLoginDeeplink(loginResult)

  const onChange = useCallback(() => {
    setIsEnabled(prev => !prev)
    setIsLoggedIn(prev => !prev)
  }, [])

  useEffect(() => {
    if (isEnabled && !isLoggedIn) {
      login()
    }
  }, [isEnabled, isLoggedIn, login])

  return (
    <Screen
      hasStickyAlert
      testID="MijnAmsterdamSettingsScreen">
      <Box>
        <Column>
          <Switch
            accessibilityLabel={`Meldingen Mijn Amsterdam staat ${isEnabled ? 'aan' : 'uit'}`}
            disabled={false}
            label={<Phrase>Meldingen Mijn Amsterdam</Phrase>}
            onChange={onChange}
            testID="MijnAmsterdamSettingsSwitch"
            value={isEnabled}
            wrapper={Wrapper}
          />
          <Box>
            <Paragraph variant="small">
              Blijf op de hoogte van uw aanvraag of klacht. Log 1 keer in met
              DigiD om meldingen te ontvangen.
            </Paragraph>
          </Box>
        </Column>
      </Box>
    </Screen>
  )
}

type WrapperProps = {
  children: ReactNode
}

const Wrapper = ({children}: WrapperProps) => (
  <Box variant="distinct">{children}</Box>
)
