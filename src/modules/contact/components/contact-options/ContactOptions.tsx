import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {getContactOptions} from '@/modules/contact/data/contact'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const ContactOptions = () => {
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()

  const contactOptions = getContactOptions(
    openPhoneUrl,
    openWebUrl,
    redirectUrls?.contactForm,
  )

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title
            testID="ContactContactOptionsTitle"
            text="Kunnen we u helpen?"
          />
          <Paragraph testID="ContactContactOptionsText">
            Heeft u een vraag of wilt u iets weten? Neem op werkdagen contact
            met ons op.
          </Paragraph>
        </Column>
        <Column gutter="md">
          {isLoading ? (
            <PleaseWait testID="ContactContactOptionsPleaseWait" />
          ) : isError ? (
            <SomethingWentWrong />
          ) : (
            contactOptions.map(props => (
              <TopTaskButton
                {...props}
                accessibilityLabel={accessibleText(
                  props.accessibilityLabel ?? props.title,
                  props.text,
                )}
                accessibilityRole="link"
                testID="ContactContactFormButton"
              />
            ))
          )}
        </Column>
      </Column>
    </Box>
  )
}
