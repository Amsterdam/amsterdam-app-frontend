import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Accordion} from './Accordion'
import {Paragraph} from './text'

export default {
  component: Accordion,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as ComponentMeta<typeof Accordion>

const paragraphText =
  'Een accordeon is een klikbare verticaal gestapelde lijst van koppen om bijbehorende inhoud te verbergen of te vertonen. Je toont inhoud op een progressieve manier aan gebruikers. Ze zijn geschikt zodra gebruikers op zoek zijn naar essentiële inhoud op 1 pagina. Door niet essentiële inhoud te verbergen, kunnen gebruikers focussen op de primaire inhoud.'

export const Default: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>{paragraphText}</Paragraph>
  </Accordion>
)
export const LongTitle: ComponentStory<typeof Accordion> = args => (
  <Accordion {...args}>
    <Paragraph>{paragraphText}</Paragraph>
  </Accordion>
)

Default.args = {
  title: 'Default',
}

LongTitle.args = {
  title: 'De titel moet zo kort als mogelijk zijn, maar ook duidelijk en',
}
LongTitle.parameters = {
  viewport: {
    defaultViewport: 'iphonex',
  },
}
