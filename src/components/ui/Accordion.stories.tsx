import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Accordion} from './Accordion'
import {Paragraph} from './text'

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>

export const Default: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>
      Een accordeon is een klikbare verticaal gestapelde lijst van koppen om
      bijbehorende inhoud te verbergen of te vertonen. Je toont inhoud op een
      progressieve manier aan gebruikers. Ze zijn geschikt zodra gebruikers op
      zoek zijn naar essentiële inhoud op 1 pagina. Door niet essentiële inhoud
      te verbergen, kunnen gebruikers focussen op de primaire inhoud.
    </Paragraph>
  </Accordion>
)

Default.args = {
  title: 'Default',
}
