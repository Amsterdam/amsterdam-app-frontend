import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const NewsletterSignup = () => (
  <Box>
    <Box
      inset="lg"
      variant="primary">
      <Column gutter="smd">
        <Title
          color="inverse"
          level="h2"
          text="Blijf op de hoogte!"
        />
        <Paragraph color="inverse">
          Schrijf u nu in voor de Nieuwsbrief Amsterdam en ontvang wekelijks
          nieuws, tips en mooie verhalen over de stad en uw stadsdeel.
        </Paragraph>
        <Gutter />
        <ExternalLinkButton
          accessibilityHint="Opent een link naar een aanmeldformulier voor de nieuwsbrief."
          label="Ik wil de nieuwsbrief"
          redirectKey={RedirectKey.contactNewsletterSignup}
          testID="ContactNewsletterSignupButton"
          variant="secondary"
        />
      </Column>
    </Box>
  </Box>
)
