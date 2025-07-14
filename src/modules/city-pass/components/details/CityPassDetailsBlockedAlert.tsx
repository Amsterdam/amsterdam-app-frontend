import {AlertWarning} from '@/components/ui/feedback/alert/AlertWarning'
import {Phrase} from '@/components/ui/text/Phrase'
import {CityPassContactPhoneInlineLink} from '@/modules/city-pass/components/CityPassContactPhoneInlineLink'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const CityPassDetailsBlockedAlert = () => (
  <AlertWarning
    accessibilityLabel={accessibleText(
      'Wil je de pas deblokkeren of een nieuwe pas aanvragen? Bel dan naar 020 252 6000.',
    )}
    hasIcon
    testID="CityPassDetailsBlockedAlert"
    text={
      <Phrase>
        Wil je de pas deblokkeren of een nieuwe pas aanvragen? Bel dan naar{' '}
        <CityPassContactPhoneInlineLink testID="CityPassDetailsBlockedAlertInlineLink" />
        .
      </Phrase>
    }
    title="Deze pas is geblokkeerd"
  />
)
