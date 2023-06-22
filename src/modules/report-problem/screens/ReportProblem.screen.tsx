import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/useOpenWebUrl'

export const ReportProblemScreen = () => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Box>
      <Column gutter="md">
        <Title text="Melding openbare ruimte en overlast" />
        <Paragraph>
          Ziet u op straat of in een park iets waarvan u wilt dat het gemaakt of
          opgeruimd wordt, dan kunt u dat bij de gemeente melden. U kunt ook een
          gevaarlijke verkeerssituatie of overlast van personen en horeca aan
          ons doorgeven.
        </Paragraph>
        <Paragraph>
          U kunt op{' '}
          <InlineLink
            onPress={() =>
              openWebUrl('https://meldingen.amsterdam.nl/meldingenkaart')
            }>
            de meldingenkaart
          </InlineLink>{' '}
          zien welke meldingen al bekend zijn bij de gemeente. Staat uw melding
          er niet bij? Doe dan hieronder een nieuwe melding.
        </Paragraph>
        <Paragraph variant="small">
          Meldingen over afval en containers in Weesp doet u via{' '}
          <InlineLink
            onPress={() =>
              openWebUrl(
                'https://www.gad.nl/mijn-vraag-melding/iets-melden-of-aanvragen/',
              )
            }>
            de website van de GAD
          </InlineLink>{' '}
          of via telefoonnummer 035 699 1888.
        </Paragraph>
      </Column>
    </Box>
  )
}
