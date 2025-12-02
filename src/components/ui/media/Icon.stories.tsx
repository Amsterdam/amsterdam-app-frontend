import {Box} from '../containers/Box'
import {Column} from '../layout/Column'
import {Row} from '../layout/Row'
import {Phrase} from '../text/Phrase'
import {Icon} from './Icon'
import {SvgIconName, IconCategory, ICONS_PER_CATEGORY} from './svgIcons'
import type {FractionCode} from '@/modules/waste-guide/types'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {Theme} from '@/themes/themes'
import {lightColorTokens} from '@/themes/tokens/color-light'

type Props = {
  category: IconCategory
  color?: keyof Theme['color']['text']
}

const MultipleIconsTemplate = ({color, category}: Props) => (
  <Row
    gutter="md"
    wrap>
    {Object.keys(ICONS_PER_CATEGORY[category]).map(iconName => (
      <Box
        borderColor="default"
        borderStyle="solid"
        inset="sm"
        key={iconName}>
        <Column
          gutter="sm"
          halign="center">
          <Phrase testID="testIdPhrase">{iconName}</Phrase>
          {category !== IconCategory.wasteGuide && (
            <Icon
              color={color}
              name={iconName as SvgIconName}
              size="lg"
              testID="testIdIcon"
            />
          )}
          {category === IconCategory.wasteGuide && (
            <WasteFractionIcon
              fractionCode={iconName as FractionCode}
              size="xl"
            />
          )}
        </Column>
      </Box>
    ))}
  </Row>
)

const meta: Meta<typeof MultipleIconsTemplate> = {
  component: MultipleIconsTemplate,
  argTypes: {
    color: {
      options: Object.keys(lightColorTokens.text),
      control: {
        type: 'select',
      },
    },
    category: {
      options: Object.keys(IconCategory),
      control: 'select',
    },
  },
}

export default meta

export const DesignSystemIcons: StoryObj<typeof MultipleIconsTemplate> = {
  render: MultipleIconsTemplate,
  args: {
    color: 'default',
    category: IconCategory.designSystem,
  },
}

export const PollingStationIcons: StoryObj<typeof MultipleIconsTemplate> = {
  render: MultipleIconsTemplate,
  args: {
    color: 'default',
    category: IconCategory.pollingStation,
  },
}

export const WasteGuideIcons: StoryObj<typeof MultipleIconsTemplate> = {
  render: MultipleIconsTemplate,
  args: {
    color: 'default',
    category: IconCategory.wasteGuide,
  },
}

export const SystemIcons: StoryObj<typeof MultipleIconsTemplate> = {
  render: MultipleIconsTemplate,
  args: {
    color: 'default',
    category: IconCategory.system,
  },
}
