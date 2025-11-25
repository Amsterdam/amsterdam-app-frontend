import {Box} from '../containers/Box'
import {Column} from '../layout/Column'
import {Row} from '../layout/Row'
import {Phrase} from '../text/Phrase'
import {Icon} from './Icon'
import {SvgIconName, SvgIconsConfig} from './svgIcons'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Theme} from '@/themes/themes'
import {lightColorTokens} from '@/themes/tokens/color-light'

type Props = {
  color?: keyof Theme['color']['text']
}

const AllIconsTemplate = ({color}: Props) => (
  <Row
    gutter="md"
    wrap>
    {Object.keys(SvgIconsConfig).map(iconName => (
      <Box
        borderColor="default"
        borderStyle="solid"
        inset="sm"
        key={iconName}>
        <Column
          gutter="sm"
          halign="center">
          <Phrase testID="testIdPhrase">{iconName}</Phrase>
          <Icon
            color={color}
            name={iconName as SvgIconName}
            size="lg"
            testID="testIdIcon"
          />
        </Column>
      </Box>
    ))}
  </Row>
)

const meta: Meta<typeof Icon> = {
  component: AllIconsTemplate,
  argTypes: {
    color: {
      options: Object.keys(lightColorTokens.text),
      control: {
        type: 'select',
      },
    },
  },
}

export default meta

export const AllIcons: StoryObj<typeof Icon> = {
  render: AllIconsTemplate,
  args: {
    color: 'default',
  },
}
