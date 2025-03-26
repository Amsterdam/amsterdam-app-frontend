import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {RedirectKey} from '@/modules/redirects/types'

export const NewsletterSignup = () => {
  const openWebUrl = useOpenRedirect()

  return (
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
          <Button
            accessibilityHint="Opent een link naar een aanmeldformulier voor de nieuwsbrief."
            accessibilityRole="link"
            label="Ik wil de nieuwsbrief"
            onPress={() => openWebUrl(RedirectKey.contactNewsletterSignup)}
            testID="ContactNewsletterSignupButton"
            variant="secondary"
          />
        </Column>
      </Box>
    </Box>
  )
}
