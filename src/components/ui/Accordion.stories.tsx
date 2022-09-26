import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Accordion} from './Accordion'
import {Paragraph} from './text'

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>

const paragraphText =
  'Een accordeon (Engels: accordion) is een klikbare verticaal gestapelde lijst van koppen om bijbehorende inhoud te verbergen of te vertonen. Je toont inhoud op een progressieve manier aan gebruikers. Ze zijn geschikt zodra gebruikers op zoek zijn naar essentiële inhoud op 1 pagina. Door niet essentiële inhoud te verbergen, kunnen gebruikers focussen op de primaire inhoud.'

export const Default: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>{paragraphText}</Paragraph>
  </Accordion>
)

Default.args = {
  title: 'Wat is een accordeon?',
}

export const LongTitle: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>{paragraphText}</Paragraph>
  </Accordion>
)

LongTitle.args = {
  title:
    'De titel moet zo kort als mogelijk zijn, maar ook duidelijk en representatief voor de verborgen inhoud',
}

export const Multiple: ComponentStory<typeof Accordion> = () => (
  <>
    {['Grof afval', 'Restafval', 'Containers in de buurt', 'Afvalpunten'].map(
      title => (
        <Accordion title={title}>
          <Paragraph>
            Informatie over {title.toLowerCase()} komt hier.
          </Paragraph>
        </Accordion>
      ),
    )}
  </>
)
