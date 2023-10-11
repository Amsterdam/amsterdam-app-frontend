import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {Block, Canvas} from '@/storybook/components'

export default {
  component: Row,
} as ComponentMeta<typeof Row>

export const Default: ComponentStory<typeof Row> = args => (
  <Canvas highlight>
    <Row {...args}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Row>
  </Canvas>
)

Default.args = {
  align: 'start',
  gutter: 'md',
  wrap: false,
}

export const Wrapping: ComponentStory<typeof Button & typeof Row> = args => (
  /**
   * Zet `wrap` aan om de items in een rij automatisch over meerdere regels te laten vallen.
   * De `gutter` wordt dan gebruikt als verticale ruimte tussen de items.
   * Je kunt de verticale ruimte tussen de items ook apart instellen met `vgutter`.
   */
  <Canvas
    highlight
    maxWidth="24rem">
    <Row {...args}>
      <Button label="Wijzig adres" />
      <Button
        label="Voeg adres toe"
        variant="secondary"
      />
      <Button
        label="Verwijder adres"
        variant="secondary"
      />
    </Row>
  </Canvas>
)

Wrapping.args = {
  gutter: 'md',
  wrap: true,
}
