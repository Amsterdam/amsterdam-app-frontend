import React from 'react'
import {Box, SingleSelectable} from '@/components/ui'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
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

export const WritingGuide = () => (
  <Box>
    <Column gutter="md">
      <Title text="Schrijftips" />
      {tips.map((tip, index) => {
        const step = (index + 1).toString()

        return (
          <SingleSelectable label={accessibleText(step, tip)} key={tip}>
            <Row gutter="md">
              <Phrase fontWeight="bold">{step}</Phrase>
              <Paragraph>{tip}</Paragraph>
            </Row>
          </SingleSelectable>
        )
      })}
    </Column>
  </Box>
)
