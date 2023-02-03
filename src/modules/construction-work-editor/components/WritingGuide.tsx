import {Box, SingleSelectable} from '@/components/ui/containers'
import {Column, Row, Size} from '@/components/ui/layout'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {useTheme} from '@/themes'
import {accessibleText} from '@/utils'

const tips = [
  'Behandel één onderwerp per bericht. Splits anders op in meerdere berichten.',
  'Zorg dat je bericht vragen wegneemt, in plaats van dat het vragen oproept.',
  'Zet het belangrijkste bovenaan.',
  'Gebruik korte zinnen.',
  'Gebruik geen jargon en moeilijke woorden.',
  'Schrijf actief. Niet: ‘De weg wordt afgesloten’, maar: ‘We sluiten de weg af’.',
  'Spreek mensen aan met ‘u’.',
  'Geen spoed maar wel belangrijk? Overleg met de redactie over een nieuwsbericht op amsterdam.nl of projectpagina.',
]

export const WritingGuide = () => {
  const {text} = useTheme()

  return (
    <Box>
      <Column gutter="md">
        <Title text="Schrijftips" />
        {tips.map((tip, index) => {
          const step = (index + 1).toString()

          return (
            <SingleSelectable
              accessibilityLabel={accessibleText(step, tip)}
              key={tip}>
              <Row gutter="md">
                <Size height={text.fontSize.body * text.lineHeight.body}>
                  <Phrase emphasis="strong">{step}</Phrase>
                </Size>
                <Paragraph>{tip}</Paragraph>
              </Row>
            </SingleSelectable>
          )
        })}
      </Column>
    </Box>
  )
}
