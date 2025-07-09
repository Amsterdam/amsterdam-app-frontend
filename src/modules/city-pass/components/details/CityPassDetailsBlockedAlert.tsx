import {AlertWarning} from '@/components/ui/feedback/alert/AlertWarning'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const CityPassDetailsBlockedAlert = () => {
  const openPhoneUrl = useOpenPhoneUrl()

  return (
    <AlertWarning
      accessibilityLabel={accessibleText(
        'Wil je de pas deblokkeren of een nieuwe pas aanvragen? Bel dan naar 020 252 6000.',
      )}
      hasIcon
      testID="CityPassDetailsBlockedAlert"
      text={
        <Phrase>
          Wil je de pas deblokkeren of een nieuwe pas aanvragen? Bel dan naar{' '}
          <Phrase
            color="link"
            onPress={() => openPhoneUrl('0202526000')}
            underline>
            020 252 6000
          </Phrase>
          .
        </Phrase>
      }
      title="Deze pas is geblokkeerd"
    />
  )
}
