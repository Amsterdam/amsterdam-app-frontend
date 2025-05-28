import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingRequestPinCodeForm} from '@/modules/parking/components/requestPin/ParkingRequestPinCodeForm'

export const ParkingRequestPinCodeScreen = () => (
  <Screen
    keyboardAware
    testID="ParkingRequestPinCodeScreen">
    <Box>
      <Column gutter="lg">
        <Column>
          <Title
            level="h2"
            text="Bent u op bezoek?"
          />
          <Paragraph>
            Vraag dan de persoon die u bezoekt om de meldcode en pincode.
          </Paragraph>
        </Column>
        <Column>
          <Title
            level="h2"
            text="Heeft u een vergunning?"
          />
          <Paragraph>
            Voer uw meldcode en laatste 4 cijfers van uw telefoonnummer in om uw
            pincode opnieuw te ontvangen.
          </Paragraph>
        </Column>
        <ParkingRequestPinCodeForm />
      </Column>
    </Box>
  </Screen>
)
