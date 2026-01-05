import {Screen} from '@/components/features/screen/Screen'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {ContactOptions} from '@/modules/contact/components/contact-options/ContactOptions'
import {Survey} from '@/modules/survey/exports/Survey'

export const ContactScreen = () => (
  <Screen testID="ContactScreen">
    <ContactOptions />
    <NewsletterSignup />
    <Survey entryPoint="contact-info" />
  </Screen>
)
