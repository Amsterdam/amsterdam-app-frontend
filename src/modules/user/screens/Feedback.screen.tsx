import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {RedirectKey} from '@/modules/redirects/types'
import {Survey} from '@/modules/survey/exports/Survey'
export const FeedbackScreen = () => (
  <Screen testID="AboutFeedbackScreen">
    <Survey
      entryPoint="profile"
      FallbackComponent={<FallbackComponent />}
    />
  </Screen>
)
const FallbackComponent = () => (
  <Column gutter="lg">
    <SomethingWentWrong
      testID="FeedbackSurveySomethingWentWrong"
      text="Dit onderdeel werkt nu niet. Gebruik het contactformulier als tijdelijke oplossing."
    />
    <ExternalLinkButton
      label="Contactformulier"
      redirectKey={RedirectKey.contactForm}
      testID="InactiveModuleGuardFallbackUrlExternalLinkButton"
    />
  </Column>
)
