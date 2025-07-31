import {ReactNode, useCallback, useState} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'

export const MijnAmsterdamSettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true)
  const onChange = useCallback(() => setIsEnabled(prev => !prev), []) // TODO: make the switch functional

  return (
    <Screen testID="MijnAmsterdamSettingsScreen">
      <Box>
        <Column>
          <Switch
            accessibilityLabel="Meldingen Mijn Amsterdam"
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
