import {Screen} from '@/components/features/screen/Screen'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'
import {ContactOptions} from '@/modules/contact/components/contact-options/ContactOptions'

export const ContactScreen = () => (
  <Screen testID="ContactScreen">
    <ContactOptions />
    <NewsletterSignup />
  </Screen>
)
